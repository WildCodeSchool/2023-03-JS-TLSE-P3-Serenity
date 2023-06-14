-- -----------------------------------------------------

-- Table `serenity`.`administrator`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`administrator` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `registration_number` VARCHAR(8) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NULL DEFAULT NULL,
        `firstname` VARCHAR(255) NULL DEFAULT NULL,
        `lastname` VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE INDEX `registration_number` (`registration_number` ASC) VISIBLE,
        UNIQUE INDEX `registration_number_2` (`registration_number` ASC) VISIBLE
    ) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`form`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`form` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_type` VARCHAR(255) NULL DEFAULT NULL,
        `request_type` VARCHAR(255) NULL DEFAULT NULL,
        `request` VARCHAR(1000) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `is_read` TINYINT NULL DEFAULT '0',
        `is_done` TINYINT NULL DEFAULT '0',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`practician`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`practician` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `registration_number` VARCHAR(8) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NOT NULL,
        `speciality` VARCHAR(255) NULL DEFAULT NULL,
        `language` VARCHAR(255) NULL DEFAULT NULL,
        `biography` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `diploma` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `other_formation` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `experience` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `association` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `publication` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `award` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `picture` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `administrator_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        INDEX `id_idx` (`administrator_id` ASC) VISIBLE,
        CONSTRAINT `fk_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `serenity`.`administrator` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
        INDEX `fk_intervention_practician_idx` (`practician_id` ASC) VISIBLE,
        CONSTRAINT `fk_intervention_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `mail` VARCHAR(255) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
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
        PRIMARY KEY (
            `id`,
            `intervention_id`,
            `patient_id`
        ),
        INDEX `fk_intervention_has_patient_patient1_idx` (`patient_id` ASC) VISIBLE,
        INDEX `fk_intervention_has_patient_intervention1_idx` (`intervention_id` ASC) VISIBLE,
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
        `url` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `description` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
        `practician_id` INT NOT NULL,
        `theme_ressource_id` INT NOT NULL,
        PRIMARY KEY (`id`, `theme_ressource_id`),
        INDEX `fk_postop_practician_idx` (`practician_id` ASC) VISIBLE,
        INDEX `fk_ressource_theme_ressource1_idx` (`theme_ressource_id` ASC) VISIBLE,
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
        PRIMARY KEY (
            `intervention_id`,
            `ressource_id`
        ),
        INDEX `fk_intervention_has_ressource_postop_ressource_postop1_idx` (`ressource_id` ASC) VISIBLE,
        INDEX `fk_intervention_has_ressource_postop_intervention1_idx` (`intervention_id` ASC) VISIBLE,
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
        PRIMARY KEY (
            `intervention_patient_id`,
            `intervention_ressource_ressource_id`
        ),
        INDEX `fk_intervention_patient_has_intervention_ressource_descript_idx1` (
            `intervention_ressource_ressource_id` ASC
        ) VISIBLE,
        INDEX `fk_patient_intervention_ressource_intervention_patient1_idx` (`intervention_patient_id` ASC) VISIBLE,
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
        `url` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
        `duration` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;