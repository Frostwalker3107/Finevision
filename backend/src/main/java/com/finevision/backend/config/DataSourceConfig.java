
package com.finevision.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
@Configuration
public class DataSourceConfig {

    private static final String DATA_DIRECTORY_ENV =
            "FINEVISION_DATA_DIR";

    private static final String DATABASE_NAME =
            "finevision.db";

    private static final String APPLICATION_DIRECTORY =
            "FineVision";

    private static final String DATA_DIRECTORY =
            "data";

    @Bean(destroyMethod = "close")
    public HikariDataSource dataSource() {

        Path databaseDirectory = resolveDataDirectory();

        Path databasePath = databaseDirectory.resolve(
                DATABASE_NAME
        );

        try {

            Files.createDirectories(databaseDirectory);

            if (!Files.isDirectory(databaseDirectory)) {
                throw new IllegalStateException(
                        "Configured data path is not a directory: "
                                + databaseDirectory
                );
            }

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Unable to initialize FineVision data directory: "
                            + databaseDirectory,
                    exception
            );
        }

        String jdbcUrl = "jdbc:sqlite:"
                + databasePath.toAbsolutePath()
                .toString()
                .replace('\\', '/')
                + "?busy_timeout=5000";

        HikariConfig hikariConfig = new HikariConfig();

        hikariConfig.setJdbcUrl(jdbcUrl);
        hikariConfig.setDriverClassName("org.sqlite.JDBC");

        // SQLite is a single-file database.
        // Limit simultaneous connections to reduce writer contention.
        hikariConfig.setMaximumPoolSize(1);
        hikariConfig.setMinimumIdle(1);

        hikariConfig.setPoolName(
                "FineVisionSQLitePool"
        );

        hikariConfig.setConnectionTimeout(30000);

        // Enable foreign key enforcement for each connection.
        hikariConfig.setConnectionInitSql(
                "PRAGMA foreign_keys=ON"
        );

        log.info("Initializing FineVision SQLite datasource");
        log.info("Database directory: {}", databaseDirectory);
        log.info("Database file: {}", databasePath);

        return new HikariDataSource(hikariConfig);
    }

    private Path resolveDataDirectory() {

        String configuredDirectory =
                System.getenv(DATA_DIRECTORY_ENV);

        if (configuredDirectory != null
                && !configuredDirectory.isBlank()) {

            log.info(
                    "Using configured environment variable: {}",
                    DATA_DIRECTORY_ENV
            );

            return Path.of(configuredDirectory.trim())
                    .toAbsolutePath()
                    .normalize();
        }

        // Avoid silently falling back to APPDATA on C: drive.
        Path fallbackDirectory = Path.of(
                System.getProperty("user.home"),
                APPLICATION_DIRECTORY,
                DATA_DIRECTORY
        );

        log.warn(
                "{} is not configured. Using fallback directory: {}",
                DATA_DIRECTORY_ENV,
                fallbackDirectory
        );

        return fallbackDirectory
                .toAbsolutePath()
                .normalize();
    }
}
