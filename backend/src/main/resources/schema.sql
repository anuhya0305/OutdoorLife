-- Runs after Hibernate's ddl-auto=update on every start (spring.jpa.defer-datasource-initialization).
-- ddl-auto never changes the type of an existing column, so widen these explicitly. Safe to re-run.
ALTER TABLE product ALTER COLUMN image TYPE text;
ALTER TABLE product ALTER COLUMN description TYPE text;
