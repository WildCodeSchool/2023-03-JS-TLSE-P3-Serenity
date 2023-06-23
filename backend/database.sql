-- -----------------------------------------------------

-- Table `serenity`.`administrator`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`administrator` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `registration_number` VARCHAR(8) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NULL DEFAULT NULL,
        `firstname` VARCHAR(255) NULL DEFAULT NULL,
        `lastname` VARCHAR(255) NULL DEFAULT NULL,
        `role` VARCHAR(5) NOT NULL DEFAULT 'admin',
        PRIMARY KEY (`id`),
        UNIQUE INDEX `registration_number` (`registration_number` ASC) VISIBLE
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`form`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`form` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_type` VARCHAR(255) NULL DEFAULT NULL,
        `request_type` VARCHAR(255) NULL DEFAULT NULL,
        `request` VARCHAR(1000) NULL DEFAULT NULL,
        `is_read` TINYINT NULL DEFAULT '0',
        `is_done` TINYINT NULL DEFAULT '0',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`practician`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`practician` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `adeli_number` VARCHAR(9) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NOT NULL,
        `speciality` VARCHAR(255) NULL DEFAULT NULL,
        `phone` VARCHAR(20) NULL DEFAULT NULL,
        `language` VARCHAR(255) NULL DEFAULT NULL,
        `biography` TEXT NULL DEFAULT NULL,
        `diploma` TEXT NULL DEFAULT NULL,
        `other_formation` TEXT NULL DEFAULT NULL,
        `experience` TEXT NULL DEFAULT NULL,
        `association` TEXT NULL DEFAULT NULL,
        `publication` TEXT NULL DEFAULT NULL,
        `award` TEXT NULL DEFAULT NULL,
        `picture` TEXT NULL DEFAULT NULL,
        `administrator_id` INT NOT NULL,
        `role` VARCHAR(10) NOT NULL DEFAULT "practician",
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `serenity`.`administrator` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `duration` VARCHAR(10) NOT NULL,
        `anesthesia` VARCHAR(6) NOT NULL,
        `practician_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_intervention_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `mail` VARCHAR(255) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `gender` VARCHAR(8) NULL DEFAULT NULL,
        `civility` VARCHAR(8) NULL DEFAULT NULL,
        `birthday` DATE NULL DEFAULT NULL,
        `birthname` VARCHAR(255) NULL DEFAULT NULL,
        `family_situation` VARCHAR(255) NULL DEFAULT NULL,
        `job` VARCHAR(255) NULL DEFAULT NULL,
        `children_number` INT NULL DEFAULT NULL,
        `street` VARCHAR(255) NULL DEFAULT NULL,
        `postal_code` VARCHAR(5) NULL DEFAULT NULL,
        `city` VARCHAR(255) NULL DEFAULT NULL,
        `country` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_firstname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_lastname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_phone` VARCHAR(20) NULL DEFAULT NULL,
        `role` VARCHAR(7) NOT NULL DEFAULT "patient",
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention_patient`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention_patient` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intervention_id` INT NOT NULL,
        `patient_id` INT NOT NULL,
        `intervention_date` DATE NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_intervention_has_patient_intervention1` FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`),
        CONSTRAINT `fk_intervention_has_patient_patient1` FOREIGN KEY (`patient_id`) REFERENCES `serenity`.`patient` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`theme_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`theme_ressource` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `theme` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`ressource` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `type` VARCHAR(255) NULL DEFAULT NULL,
        `url` TEXT NULL DEFAULT NULL,
        `description` TEXT NULL DEFAULT NULL,
        `practician_id` INT NOT NULL,
        `theme_ressource_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_postop_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`),
        CONSTRAINT `fk_ressource_theme_ressource1` FOREIGN KEY (`theme_ressource_id`) REFERENCES `serenity`.`theme_ressource` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention_ressource` (
        `intervention_id` INT NOT NULL,
        `ressource_id` INT NOT NULL,
        CONSTRAINT `fk_intervention_has_ressource_postop_intervention1` FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`),
        CONSTRAINT `fk_intervention_has_ressource_postop_ressource_postop1` FOREIGN KEY (`ressource_id`) REFERENCES `serenity`.`ressource` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient_intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient_intervention_ressource` (
        `intervention_patient_id` INT NOT NULL,
        `intervention_ressource_ressource_id` INT NOT NULL,
        `is_done` TINYINT NOT NULL,
        CONSTRAINT `fk_intervention_patient_has_intervention_ressource_descriptio1` FOREIGN KEY (
            `intervention_ressource_ressource_id`
        ) REFERENCES `serenity`.`intervention_ressource` (`ressource_id`),
        CONSTRAINT `fk_patient_intervention_ressource_intervention_patient1` FOREIGN KEY (`intervention_patient_id`) REFERENCES `serenity`.`intervention_patient` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`ressource_relax`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`ressource_relax` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `url` TEXT NOT NULL,
        `duration` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- INSERT INTO 'administrator'

-- -----------------------------------------------------

INSERT INTO
    administrator(
        registration_number,
        hashed_password,
        mail,
        firstname,
        lastname,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 8
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 8
        ),
        '1@1.com',
        'test',
        'test',
        'admin'
    );

-- -----------------------------------------------------

-- INSERT INTO 'practician'

-- -----------------------------------------------------

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test1P',
        'test1P',
        '1P@1.com',
        'test1',
        '123456789',
        1,
        "practician"
    );

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test2P',
        'test2P',
        '2P@2.com',
        'test2',
        '123456789',
        1,
        "practician"
    );

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test3P',
        'test3P',
        '3P@3.com',
        'test3',
        '123456789',
        1,
        "practician"
    );

-- -----------------------------------------------------

-- INSERT INTO 'form'

-- -----------------------------------------------------

INSERT INTO
    form(
        user_type,
        request_type,
        request
    )
VALUES ('practician', 'test', 'test');

-- -----------------------------------------------------

-- INSERT INTO 'intervention'

-- -----------------------------------------------------

INSERT INTO
    intervention(
        name,
        duration,
        anesthesia,
        practician_id
    )
VALUES ('intervention1', '1h', 'AG', 1);

INSERT INTO
    intervention(
        name,
        duration,
        anesthesia,
        practician_id
    )
VALUES ('intervention2', '5h', 'AL', 2);

INSERT INTO
    intervention(
        name,
        duration,
        anesthesia,
        practician_id
    )
VALUES (
        'intervention3',
        '2h30',
        'Aucune',
        3
    );

    INSERT INTO
    intervention(
        name,
        duration,
        anesthesia,
        practician_id
    )
VALUES ('intervention4', '1h', 'AG', 1);

-- -----------------------------------------------------

-- INSERT INTO 'patient'

-- -----------------------------------------------------

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient1@patient1.com',
        'test',
        'patient1',
        'patient1',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient2@patient2.com',
        'test',
        'patient2',
        'patient2',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient3@patient3.com',
        'test',
        'patient3',
        'patient3',
        'patient'
    );

-- -----------------------------------------------------

-- INSERT INTO 'theme_ressource'

-- -----------------------------------------------------

INSERT INTO theme_ressource(theme) VALUES('Comprendre');

INSERT INTO theme_ressource(theme) VALUES('Administratif');

INSERT INTO theme_ressource(theme) VALUES('Préparation');

INSERT INTO theme_ressource(theme) VALUES('Anticipation');

INSERT INTO theme_ressource(theme) VALUES('Checklist');