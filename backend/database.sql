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
        `role` VARCHAR(10) NOT NULL DEFAULT 'admin',
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
        `create_time` DATE NOT NULL,
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
        CONSTRAINT `fk_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `serenity`.`administrator` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
        CONSTRAINT `fk_intervention_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`) ON DELETE CASCADE
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
        `phone` VARCHAR(20) NULL DEFAULT NULL,
        `emergency_firstname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_lastname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_phone` VARCHAR(20) NULL DEFAULT NULL,
        `role` VARCHAR(10) NOT NULL DEFAULT "patient",
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
        CONSTRAINT `fk_intervention_has_patient_patient1` FOREIGN KEY (`patient_id`) REFERENCES `serenity`.`patient` (`id`) ON DELETE CASCADE
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
        CONSTRAINT `fk_ressource_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`) ON DELETE CASCADE,
        CONSTRAINT `fk_ressource_theme_ressource` FOREIGN KEY (`theme_ressource_id`) REFERENCES `serenity`.`theme_ressource` (`id`)
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
VALUES (
        '12345678',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        '1@1.com',
        'Super',
        'Administrateur',
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
VALUES (
        '123456789',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
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
        request,
        create_time,
        is_read,
        is_done
    )
VALUES (
        "patient",
        "Demande de devis",
        "1Mz4 gsU5g2QC6KOO P3dXP9m53151361F kP6Yod8AR",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "V1wsIDEJe3 YS9RFTNAkwmjeq 2Dyfk7hiJHX91rY9o9926p8XL",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "31LllxPtQ9MyrnKx NvTkqVQamRK o674s72oX",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "842 402BN lGcpYM9g 2P2Vm5Sdz aJFe7999q5 WfLN7",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "1Mz4 gsU5g2QC6KOO P3dXP9m53151361F kP6Yod8AR",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "V1wsIDEJe3 YS9RFTNAkwmjeq 2Dyfk7hiJHX91rY9o9926p8XL",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "31LllxPtQ9MyrnKx NvTkqVQamRK o674s72oX",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "842 402BN lGcpYM9g 2P2Vm5Sdz aJFe7999q5 WfLN7",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "1Mz4 gsU5g2QC6KOO P3dXP9m53151361F kP6Yod8AR",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "V1wsIDEJe3 YS9RFTNAkwmjeq 2Dyfk7hiJHX91rY9o9926p8XL",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "31LllxPtQ9MyrnKx NvTkqVQamRK o674s72oX",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "842 402BN lGcpYM9g 2P2Vm5Sdz aJFe7999q5 WfLN7",
        "2023-07-04",
        0,
        0
    );

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
VALUES ('intervention1', '1h', 'AG', 1), ('intervention2', '5h', 'AL', 2), (
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
        phone,
        role
    )
VALUES (
        'patient1@patient1.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'patient1',
        'patient1',
        '0612345678',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        phone,
        role
    )
VALUES (
        'patient2@patient2.com',
        'test',
        'patient2',
        'patient2',
        '0612345678',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        phone,
        role
    )
VALUES (
        'patient3@patient3.com',
        'test',
        'patient3',
        'patient3',
        '0612345678',
        'patient'
    );
-- -----------------------------------------------------

-- INSERT INTO 'intervention_patient'

-- -----------------------------------------------------
INSERT INTO
    intervention_patient(
        intervention_id,
        patient_id,
        intervention_date
    )
VALUES (
        1,
        1,
        '2023-07-04'
    );


-- -----------------------------------------------------

-- INSERT INTO 'theme_ressource'

-- -----------------------------------------------------

INSERT INTO
    theme_ressource(theme)
VALUES ('Comprendre'), ('Administratif'), ('Préparation'), ('Anticipation'), ('Checklist');

-- -----------------------------------------------------

-- INSERT INTO 'ressource'

-- -----------------------------------------------------

INSERT INTO
    ressource(
        title,
        type,
        url,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        "Gray's Anatomy",
        "pptx",
        "ca6C80pXCRi1tHVN8T8EEFhS9gGw205TI18TjJDuX0Kl2O5MBwJ80ojSW5s4w09Cj19Q65NGwllUkdg7nC581pcchnB69O5X3u6QQtsRE4XBrqyPUJJ3g8k0zpqsUw7CaDW2c2XnP7zI5DoL2FCR8W82ozzlPGFrGT02BKK8FkUjmF3x25f588uv5kQRLUDX23Rxt63J766K78T3ximwxqZz3cR97PE2qf",
        "9W1nw3vOB",
        3,
        2
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "Y3tsLu1CPdyb8wZZr6Pt7Pah8RqqvVIa3L07DY24BY22weN4V3ltoq1T25K33cvP4Iy68KvxZP3U3V1h5k79q0tr3pDJu3n3q2IWb66MYVFH9sr4aHm0Hn75tsZpipJlMYDF5R41Dwhz7ww1y6rm8tG1CUSDKelp6Af3yM9bV35d1Je53eTjo5q4XCK6oXDtvp53xw7C8k7Qw7MZgwS82ZP5z6IUHhUtjW5NsrIOWx",
        "Pz0SE4z5CyL9STu31PpFu15Jn0yn8i4hhYMl0Y1z1B7D0NX3D49TY3O4jiRo9I4xcW8v3n3sd1h930H7Jh4R2H7S4fuSmIJltTJwv4Kpzsf7Kk7z1nMdtNuEL5kiF2K8P6CV8XfmUVtLXizQ2aIe24cDah5n4uo03",
        3,
        3
    ), (
        "The Merck Manual",
        "docx",
        "MQ967iVW8cpEDaQXZR471O7Sru8844DFG0h3HiwExb6F0LEeN5OAa1u8D8oKO5O8GH1oMC63UlLjdsUF7OaS20c0oIzr7qdn0J0G4Zl262sJErGPdK2x1er2cZXA7z4iX4zdCYSE96jpqP1y6ZVC7Y3pXO20qfHZg2uM8aE5VASAq1aSs6Fv7bqbwgjW52em2yJ39H3rx71",
        "n1DYdfg4KHgbxW63S9M06dAHR7h0xhWRj5H92h71FNLRX2s8WI25W9e2hMwkwU01H2jDnjub3392i3xLitmC2m36u2sEuZgnpd3Jb46Qj0jAFTmrESo3KSqfR2WN026Uj28m91N2SYH65p8e68j7U2389yb0KyEhCAYj87paB904Ymyi7X67o1KpJi962849gKTSG8MhnOC3U",
        1,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "docx",
        "F9AwoAWz625SwmrrLhADGs94hpqGdlDDYJ24uNjhGeM901pA3HoWx83YPH15fudN0EpqHch2wf8FRRqL89rhn9a28Nvrurk0do0m9Ge435f20Sb5hs2f5ssU2766qrtGG60B46P16b9y1njrC8T7Z7oW529fa5t",
        "LY8Z5R0TX56BEc9z39o4YCGTIsXAdCqlvz",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "8u2P86HF6P73LMeqoeMu6EKz9C09cMVjro1l5n827WNCkg7IDHkmfDt7aw0IFIKh8",
        "ol98z50w69kFEbpI7s7iWfCM92382Oa0E1tfnR1fBKMzxQ84Ft8pm33838glgAML8dI227yc2S9z00535FNJfOwIJ40tAN8ygt5kL202778PViF2N8qNtFA5RDq076XDpAo5Cu2rmZ1Ctzbga6Z24w00F2k1JjpZO1Fsa94565BY9S2wufGmIgfo",
        3,
        4
    ), (
        "The Merck Manual",
        "avi",
        "U8TpF7y04a7ci8JEE8MxQtEd9T1x6dcTE7a2VlMdjxje32K2auHUK8AY",
        "ZyvTQSnSXmPySbl8jWC69jR45W94BXko45tc54n6Zh19hZed1IQ0o4XjyFJq9p512svIZYEyXP9j02xfXfVAD79g4i720km84p8ENDhFtICl1aKU30687j8JAv2DSpBN",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "pptx",
        "GZuv3fqNp27J6y36MEViommTMIdx2N4Tgl06a0097nJK7qt70knRws24UhsKZ4CFneR4IB55d0gMGqA44tY5c146t1mi278Hxb3GmM1gQ321S76rXlunDp73Nw28VD6U1x718311e5qpy",
        "k767IRSy20J8Fh9rPFUv3p8t77oSM27RlLll5uZ1yp9oYgRiGeiNmp4woQ635x5goacmi1YNY1OO6dxHo7v22i186Ug71Lc1k3i3gK7N06wjZB81cV7zNxb1mP6qYg7L9lT3aTiWeb4Bf7PshULEEMl4f5MoAPz53rT6mf5f09368pp5AS14o3Dx7fT0rcfnwQfN2",
        2,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "rM7t13731lRf6CmW21vJQD026DEDGj1731YPem469SM486s4yoU5e41053p9890u0fkMVFruxquybC1A6054Q15gM68YaxZtcVnQy1tYz1u64uW005EKs5X2IZ0Vvs3jE73gFKF770qwXt2iEMZyaN1L2EOf9uiguur75oaUFV7t4VE7qRI7i",
        "e0",
        1,
        4
    ), (
        "The Merck Manual",
        "jpg",
        "Y6guQ23ZPhQm3fwT92ur8MQq0aoKsbzls0K73IBaHaXXRQJ6wX6nBE10CflV6l81yx9J8487BRAj4ZEP4xeamt61z1Fq1q4Am3b1t9FBBsTbe4Ki97tqk2Gd6FAuq5z68tU1j3Gs0P19LmLk4qTg4T1583Ahh96O7e8575phmVRwY9l1kn22Nb6z8T",
        "8TQZK6CpI4Qle0T46DAy9Krt14H8d6JiEIB2BYI8ckK7m2uno9CZ6AU37DZp93MeVl9b45519P4m88AJDKic555WSV0bJlI3JZ7IktG6540H6fbKVKN3Adary08Q5dzHhjW78z383Q8abaw1WPhxpVnPM2245nx4B2",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "2jd4Ljr9ddOFzT65rKheJn4J2Fy5Q4R397leDTscc9tH2zaSDtlYRqj78jB86dwlx5QP7GE3htT0iSQi0yVC6vn170",
        "e78gkx4N06vjdXgG8G7k3WB2ZywfB06i0z2RIzo8VOPhRY61Q0j77DK9eh5t3Yc5Wjn69XQ6aQg1cX85onFC4p6GjU5BDhPDFh3ln84GCczUKd412RDO76",
        2,
        1
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "hVz40LtWc1XD8T9LxI8K317m63Ilzb6EZapH43zdcrh6gJcxkd72qsFgYyC6def87dU2rQffKfdHa21000yE507fq0XoSaDVDv5969S5G5RK615gN9WUk1Q9uDA3mjC2y5Tq0HkAl4hJkk0RD4h0bY2JPrLQCX6P9MoBRUt47EY6ELTq632EYU53Y3X3W387uP8jS085HjVE8whFUZ5KjNjFf5XJlb7aoojQA4aY499pTQ",
        "0lQ1G219T4jyo4HJLROHKNXB8jo70jFQlqZHN9D606f43V6zAr5N34v7MT7grBQ9nfFYKY5Nu8h8o6swzFwhAfrmn5d4t2sWmTu4tcq4cSL00eo04s2CXf6ipLH06l7D3uRinKV78nEF2xC452Teb1soGqDR52Vkq5vnDcELNpzk0Dys51tPPNux4Wiad0MA25nmx3mI6329cAn806gzo187k",
        3,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "FdmzR6c6AOBhTeD6ZKTA9eeXTmjR3IlqFom06L5FJf91T47tDCtzRaYFFKwqxlM700n2ss8D60q88iQOx1G7op7Hby7P5dUOh46zXe7K9tpsP584FeE0VZ1IJ4nR8jl424b3P1QXZwAOHypz0Yzuf3vUIOXxvlR9nMAL62v9hc2ARH8F4hMYE9T3uU01EpjXR0p5qHL7tDL03k3",
        "0IIc199qUvbveifYqIhT",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "7rj7H5QNb2o1OuCSpLqaE",
        "A65BV",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "29Ad90oGl0rpPvM836h2N5g6pPgfS8nsrSzz2f041keG2Rqxc5ONRutdXFgPaB3b86zoTfc2YOwechhMu4iKdC8RO67obLxV91z7w228yg2E7i3Fwk5LqO8uDEJNjD30Pb98OpW2j6RszS7du4g0ReF2xcps7DST56GbKWEBvL7bw217RQu1rQC8jL7ly3XCWeh8MuKG5qVIlNmcq24g5h",
        "0m6DB0dV7Rp47bBXG7U4sP7mJFA01Z7qpD47U96RFj4CoBc431DV6w21gQq6DZ64CE0UKOnb11QAP4W0JJ8QpiPJi88sxVODCMs32rr1Lq13luF2se9H4KRv146F08IvvKdYkK7R41m4c9Eo2p66uC3v0j8rS6fOjzosmgJVnSaJvesFR9yu470y5HtPrXpmq9qGs02HHx2076HFZ48U7zR3BZ3jI09A49",
        2,
        1
    ), (
        "Gray's Anatomy",
        "docx",
        "mnH41JDj1t74P65447JFNQMFAA5Fr0q3jTLe3ymo4VdtSb3oVAgBf739KR8RkDAmHrPrg8b1IL6iYbc5f8zXu642W9S4E8DQ9l605930FlJDl5rDFjx0r27wS909E1RYE6fBH925jy6jXZ6R04BZlQBc2hNPQKI6K55GlI97ws2Bij7Qq60h4cTa2V5TqQ1jW58VrG5boXioy0XgmH4uNz80oF897Ehlpe84KRIf97i7Z26xiOE1z88M3O8",
        "93vW1fcOjj27jw0yk7VXyC9l1ue7aJh1R55wVlZm7C03mi73p71C8j5dlZ97oO4bxa5gBno88CT32hncXqDQ0191B75AitkpdfG014Fco607OxDt0T2Nz39kBbVGMzcfYjf11Y30VdC5cZiIYQeis74E71f2wQF56x1mkY0f1eb49iC11l70YY8i6z1qT7NLDgPB88rDAi8F6U24x1O27W732L94DAJ4fLPyj0Q9oJo3",
        3,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "XHv4g9IvkX27PcV2lyUX4pP7N0njTU9IEI1o2ieSFsylL1S7X12307IRkNzxuIr7I87oQ9R8zYA49Dt6gR38E9GxV2KQjE6y86F7RM04tPoj2swLECTemIO8dp22jrP0Z3r6D8olUgfYkvL6aU627Y8H6XVr4DzD2CxR9vjqac3Jw2XVbxhi7tzc7E4t91LKOwPD3e1jGa8Blpq8bcHhmcw0B5fM8CKVt2Q4KD96WJ4940AGKw842x2g5hXx403",
        "jHTY10aF7zqVM3pZFEJC7Qn43khiWv3vI95RA4Iqxjj3kOw8j9Bw1136oB2Vj2hzmJ5V0tdVfW1WEA9us0mWDGO",
        2,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "13u88ZE50ryR9A6tev3c811hHKVzZy3y7894v7WCl00n7E1YhWPrP3pT1izBu28WP1q34RYr9v86327Avl2QpL98L1MOaHyrysnkL27io0X12whEygi3k11XtQ26Nr68eI0TN4Dm6A970",
        "b6aYH93CMG0NoRY1x87jK7p46h3Ipgx5l5D7pZf9wXq4PfG648Pfkn5GUU5uz1Nb9O8TuGllWp7U3gFhSL49WHSy21F4vhkjb4e4Cyc86trnoyiNF84m56YTz",
        1,
        3
    ), (
        "Gray's Anatomy",
        "pptx",
        "0Qj5mZXg583LThMOTjAN089f4qg2DRMA17RVy2uk51K2OK7Zi49ZeR1GXz5KpoKjEU",
        "le87MLVH8kxpEb1v2SB4vaVDCiFyPq1rdJ78WAO2534YSlFhRmqk1fOMWFA7ZD41w91X015N2",
        1,
        3
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "A723C7tgqVR45831r5Tyb67Q7ER0Xa5SI53h9ON67b7Pc3",
        "uZQW17f0WX5Y7N8dS64UOd8Fpk5okJ9Fx42wHx0bCP4Vy9EowuE8vgtxzipkkXvdEl1tWij4c3RG1cnIy336TBNy0RD125KFJ0BuZstk3HLzMoxwu9U9a53j8tIKhKpA8EgK4eS2p1oB5U7nXLYgy7Fgj0bl5ozeyQLXILZ9VUuVF41L8bsL97nMbaFST8ImU2",
        1,
        5
    ), (
        "Gray's Anatomy",
        "png",
        "J8qypIM7p6Y9dOOvPtG3nc20Es5LiucOZ69eSR8gl8ZBDVw44U98UlPEJu3784U0x6oy09pBX0d49HF2Y10bl2z2OWxsxkl3r2WmQsY37368EmUd2ylmoWKG32wd6qnFt58p33JTC5bo49Wm8244y7pUGABz3Cc34S78R6pA52Lwp22234",
        "FouF5V8oAYKEp7I4a5n40NN47HA1WuH7D8xOjX18W9PEtP6M0mjEZ7jt007jlez51a7h8fQ31NECcU1jaC7q804QE8656SQ0xvW3HhgTrC8IBW8uZyH8X4CTCH76a4MTfUxl482IR0a3z3cPtz9bl6YaX71n6M25WZ1jNY61gk13076mC2W9R6c9A96nZ9",
        1,
        5
    ), (
        "Gray's Anatomy",
        "pdf",
        "lG759HqUl1C1e9WQi4jKFT0YvA2FH6RtZj4sLGSEj8Tx25Y44U0i2A9sAbol241dZKgj7LmBeKq9a4sEXu1lN9g4TCc615iT7r55Qr8d62K69b2x9IQ7duNx6z8cAy9W4hw07Phl3oz8y3k4rWVJi4x74LvolWE1V7W1B7P7Fr368",
        "MCzleONN1krMU4zg1xJhhRWd8npbUunG9uw3317Qo8HXi8SZqP207l9mR8svnP12Rv7D9N9vf03bQ0xuYaK48ll1FWoXJbnESfnXF19N5N0ch1y1xuqeY1l5NgNNP9038n8lXlzm6ZJXG20EGw39eiR6ze46hu5iji4CPxcAY0Mw5R90S0AdKHxyLvVbn57PW3iYjziE8Rfx344qLrbG37TDDnm4Uj1304jZ7h0jgu",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "avi",
        "mUF1hGWgyf2W05JgQ78fkzVQ896ugCiFGbzV9jR2uWigDT213Ly1JbzM33j1y3e6xchU5iZur5vh1HsBM30OB4NrdlknO56K2d7XY7Q4g9qE088Gza2CWyYq72C79WWRuj4Vf1D6m0TxCad2u02dlV4dxl5Jc03792SlMN5SXG4",
        "eFpyDV29OUTA0RM84qJbsFb8XmV6Z6slsMohZ1sKOeoKtTG349pV9G7L7brg8kM1JHaGQsWTOC26U0p4AB02KZIRPuIaI39r500LfavI3al1jan7FO65oIM1Y045zU62",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "c9hF42ooa3UGSl8wSmP5uKxPb59mZ50hNhI2Ow5nNup1n10q4YaFOYp5CXx528AOL413C7YVI8sxrkcfstR4w5Kjzr1tw5gZowPpK0H1zYD7RYdc0G3Acw765ET4P8T0U08fWDV1Z90f74Y48uXqD3Pbh8988bOhwOFpSEVXX4SB374Pa6UA81pITwjX1zUB0fSMG4JGO5BeV7Y7MBc",
        "im44202h2560f3iC1qUkJzujlWr4J6A18T40ODKkh8AHb6HocL1Ul3Hi711RZD8g281o87K58mkc4Q71B8lM3eDPt6MOs",
        3,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "P2m2I82r5805eH6K7y3QPg1684B39IO1YAi28Fpp01Fu9W2o82d933PihnJjmJn843cKHBJ0eV301kw82G2zdrC6Ec8sQ2cdLVWnu564P59t2sRu163nX5pf4rC127c35S59jTuAq4Zd444f3OVbyW1mrq8hL0yA7zsNKo",
        "0dD5HTshFyTcQpE44Cb4e8qjiVBeE6EB2kBTo72Xh9B32d180a6P8008b5J8796h9El3z37w1i",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "png",
        "MsP3OKYNyAs9Ma7Hiy1LWdZc6779q10q20nt9LTzTax16D6ccU5sr4YOG19mR2K74trOgBlwe4384Vz7yo2",
        "3m6QFk1ClAzn3I7On5Lbhu0wtoILiGXv566MRg59Wlbm6iGDD3Pwk4Ixr92VEvF223Ce97Ea2eF8Wv1ZiWRcb62o18f3r6CwW7oy6fU7j8x4o0Oqi6MA5RH71ff7m5c0oDmKm1RC13X42AIW1Mho7uy5tHMOAYtTxJgX1mJwDEte8GntQG2W206pDbdMNniEqUU33B1qrs0N7ApHJ16138",
        1,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "19vW9188JU66g1u97y6xV0OBuo5w9cCEJO5JX8BlFp8s14NuZuJX2N3ANH551aCnjVbla4Pc4EWg73Bw591QS7n958rGOZNijKbZdSc0a6UA3fO0a5ZD7517Dkg0",
        "Y",
        2,
        1
    ), (
        "The Merck Manual",
        "pptx",
        "50NFP35Cl3v08lKox2rIny4814fzwbS1Bs2mF55oG61ZC13t6o763SuHMyfIlCqhHv3y0ftu1J64jFZ02PxFHg05OiO369lSUMhKKTR1L0u4LfT0CekeQ2Gky29bk8FtlCtkLS24XXA2K3v0820R",
        "5i73UwLx35Bkg15V5J4k37Z355HkZU91S0w87bPHt971X2U3k8V9l31JBVAFPKDyxnJ74K1f4bllQS41cE3JtUnI212hC4QpD8U3UZAoX04h9LJce3ic70u2Mo4r71QLXf2p0wuV4rDbLsCv2UmYRdAjTE9sBuTOhZqndzqgll54fnpyVkHaN4kS1lmZCbDC058dknCQ8fXn4u0rIHqPC9418zOpp22MZ8",
        1,
        2
    ), (
        "The Merck Manual",
        "png",
        "HAfmd0Apgu78exH4IB5A1b7oxxEJnacry45L1lA1vT251o79dG4yv2yB2NZZFMCZe6dyJXZL21is1VoK175WQd9fnX9E6jVHTrS38txF9i6QgPf3P3RqlCuDdZMv6THbq036Ws91rS8hU56T06BfI0I2eulC92oNUSvC0sf0BG4Y3Gs810X7YM4k0D6h7A1e9EjT64Ir6hX8z38vZ7VpmNm",
        "121eBsfH77kMnFih1L5L3u3G9jRd4T8A5F64k58Jg4qx9TPX6bJ1o8YHC9vllGv0L9f0r09cznA6x7gsgU9nP35x1rK1fru815S8dMV1r70",
        2,
        5
    ), (
        "Gray's Anatomy",
        "mp4",
        "X897izT1Y61D70vuBnTEoywJ0Ej494341jq696Z08bPUvsq2tT78033Ay7Lm8a9cFx9D830DmTD6ik58lI54j0z9eiJaPK1lh5x44sR72J2Q3r0e80f62c6J3FUWvVb6imZVTyQhQ5J5DXRbjU3S1WTGt3Z4ARHo3h31QrbVm1bxg50PieK1388ekxUxC69ho78R0oYRxHuoNrHk91a",
        "v8Zxv1n4iIb82H85C8r6Qrpd9gF01roRX2064jEqeHIdRd82aoooV1iZt1JKL74T28j6vGIj5dYEKy7i6npy1M8RTUujj2355k5aZ8yaWtSVLMQ6k87704yJFNd1u9uq01Fj1t7PkZNd1jH1Tw2ZU4k5EO31XZ0q8feBx0CjFl8mSKJ2914zI7JCxP09224Mi7irqg542kWqLIuybHC034Ne492305bXK8hD33J",
        3,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "png",
        "4M73sH2EC27pKR49dk1p1099gxEu9miX8395MYV2Kpn57Y4jBGCRyikSEY8qXdsh8KvaWyPHfoDstl7ci48S2AJaS1CKDI94wyxEwMk62M5rj94vUS6cy2A4531gYSFVkn3Mq1g8cPsRwL727WBx3O9ukK6w5ccW3X4",
        "0JG6uxV3bRMZYTq1031BLq9s4hIhYxNxAY0dZOXD98Po9RAX3cq781ZebZpQgd2TWnl93E7Xy9P3z6ls01AO1O886ldDAm9K6s2N19b6GR97S6Evm31adkPU6GyqCC2gt23HL3Y69KDOj322VYHbvBuJL06iN7N2j8z4Fet1wVl08blz177",
        3,
        1
    ), (
        "Gray's Anatomy",
        "jpg",
        "UVy1sBDz0b7R1g5F2e9tUNC2MZLQ9Ua9alUt",
        "XkfYemc8JeyJsNeg77D6c5DJ2ZwTBc42RxkuIy46km7j3U15g0KK03DR1ZwWY5l8TV25R089IH5EmJ36V9jSg31XKbe91IST6W1yMHDDsO8DmIRPa2KgQLj6LMc2CTPF0q3vpl06p99mnTn167X4bk5x657wVATawr6I8LpN9N6Mc6pfer65V5409",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "r12KLvjWxucK3Py768CIChJ4BjeWg8bFN5yGcgKU8b60awcWad1k7Gm0LcVgYkZT6WDl05fTcJYEj7p6afS6pY9p3TFk4K7GeAo2UyA90p2RPOK32B2Qh3aLInl2Hzs8PApR4IwN7hJx3WBd9VcGY1WmP2jhT0qrjAJ57sZS08X019li7gz0m2R",
        "6z0pF5UCK5X572mLP5vUZHp7I4bx7x4833ZU7Z5V1DUgA85F3RwFDCKH5QW3c8w5N5ZHPes7U6gbx5t4WYH1Msi6s8EASthHt7KvsLUO58b80LRQS85D",
        3,
        3
    ), (
        "Gray's Anatomy",
        "docx",
        "626E2GYo4xUqEm5tau73hGLDfT95K7RfRXPoXR816h99JV6ah22vr5qp89dBbU95lE1Xo0Dsyu5u8OA95YXd1288le5r1bc5jmphNBv6VSHM8NS78NaOP4u271a6vtdjUQrzQogfUQcZ3wLR4367uh6R1w4u40YY4632a41I35s3",
        "B5r463bF7iYSbdrDklL49dOR7c8f3IKC2BflT1ah93wASSisj2UX9w58jOy25DU17YbDbB2J8QowmL32v67xtL0KR3JOOtyVv5057K8Cu184i5piF7HM2q3Mqs5WyKd5Kp23Mv6wNKBg0t88i90h47Nxfn3x6R4z4WHEj",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "9im8D1nDnK13nNPJ8z7J6s352NA6Cxlno02S496Tc88dPkHL0JhD3",
        "A1C093EXRArm76ua803vd8RJIpJPu2Jr9Hz9632S60D58aJ66dbzP71bo71l30yHx1ak1V7Hp2F05327U11jCHp6qu7V29WojDk5xtAc6UZW3O1",
        2,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "C5n44K9WYa58yf72k1UolhpcqL9ddtHy",
        "n0ATKIxf4c6t3J4mJ0nE6X0Mh7P219Tskiukrw4WpWyTn4X5sZyyZy0z11859gTe84qhJBWDJM01a9k1335X0ONASM35NyX82IgGfzB1Ii6JFK3TaDNir7kr8lh91T9aYVWeI9EJEIA5TwtizyhXwIrw4a05F7Yboss142Shx9oHie3Y5GzeD40sbN5nFh27J60itBXzthWDS0ia67WU78",
        1,
        3
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "png",
        "vg9hHUwe5Gu4dgH83473Dn12vRanM56zWQ9cxM68Av5666ce8E7y5QuNMkbe6Ys1lG7fy8FR5w7fURUkiuWoEqZrTW9Hjyf7RIX2pKFL6C8cB2hJaBFA9427Qmn3Hgm2Y7qK231EkwfeA4E8SIC58v1064PfB1nN1ppjy8wAMY2R61pBlxp693lw30TFv062CZQ9I5oYl7SvlYD8a5oI0qA7hp73G239U5X82ybcOT3T6kMzkv3mI4",
        "gt3zQrG62kKkhKn6ryDMxB69Cx1jf2YRYp29ef3LtyTaNl952Do0EH532jLKc3oVe5OCJH4C60178usHUdlFoD52b5os7ygeEP3mFq3068gc1Kr5N4B7Rh202Wl71HH2o41mJB0S2Jb218f7PTYw42vs5t2b07Q82Ybn7gKX8k1Z347D3c92G9pC3cs70LPLXCfp1VbvNq5f46smLhKOczXk8tyb",
        3,
        2
    ), (
        "Gray's Anatomy",
        "pptx",
        "bdb0QlrA5aQmb4nB4zUIeb2mf8O6I9239HG8AtnE9rfR5lgOZ5b700fix4tEpOqG05Ha712KjB2M2gVJhk753H1a5RGb6RV6LOU7q4AbvduJ747p6A5s45o3jBf96th1HyUijHO9YkxX7hGz16Q1luPex1ivDN0u9BEJQNGB4gYMV2ysfx",
        "89I9Is5p61TfO1meV5OFHh0Bja9KbYyBm8KBgU766sdJ536EN0EB39Kx0X1oB91V4Z7py",
        2,
        4
    ), (
        "Gray's Anatomy",
        "avi",
        "MWfTaulMSL0W845B2S03WvQc3X0RfxwGZ690Cg9X65g7hilCYR68RU94boVy034awwo85OBg0wS0Eht8w56qsiFqxLWGDm79XiZIh05c5WHnHFwc2WQyaNnQcN039x56C7Gc0kKarlM1mTJ69CUCK912Lclv2II65w022pIJY14fWNf",
        "GQ9Z9rx0zS412Kz29dh7P4HGC",
        2,
        3
    ), (
        "Gray's Anatomy",
        "pdf",
        "nR9Anb7o4rBzH7DAp653675c1ACNY41lv5R5Ds3oaZDrODabTG4MLCsMs7T6m989S2r5C17d976m5PoBOytHcVX87bBN9jwzVEQgwP4rYiimvCiym2BuI3dL52oNFtwWAvzxh8MnhA61oZ46apWf98F95wJwF79I1G6eZdctpS0S5I1QNVSD0p96PPZNcD8EoLMCBXG46RJFX3dvEpxKiV2vB2i6wd8ya243LATNYJ04l9CERC7ZHijcN8EA",
        "b89SDvBcPEMMXFuGO7v10pM1lvEZJBfc3v6v9fueA4uA7J3tsGy049cf3N0F0Skoy8m7ph55kqU12BN8T9J20qz1sLXS6S49ehB08E8pAal8ahZRI38b2BivK8HmUD2wVP2q6U0f4R7yp",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "mp4",
        "57BPmksQs5eZiNHQ5on09cl4J3RPq7hnySne3o7bXj0HWO08z1ubAGEY8rpa6saEas175mNx5YZoWfd2ikRrdvS75W19rc2xLJi57RpJ8J3LCC41GT8ak097o3",
        "fz52O232w0f9Z3P9AC3g45c",
        1,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "knyi09ak6rB6ztAK3B2874G5ZD1HmkzmcL52llcoF9JYRU64O4Y3Hm2BZz12owJVdT6L7JlyckTfbX2XI8HVV54fg0vmXlA1L07r52v59oGuc30X89jgQ6Smah4F884I9",
        "DRdSNByL9rGedFk5lsMKKQ7Yyi9h1R4g9v3T5e64y4egQr9vSR",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "avi",
        "7Q2A50VcrQaTRnbU5sW07r7dEml9VGWVXlzpoO9N9Z6jjG83Ig9sdh2WW33Q40FR36g0CR9Rggm44p69phnCK596Tlx9E1N1YLz4PznneZz4bVHnECmnQZgkJmR3dtjdBZcjAtH98n3KmjQFxQHzw9476le7FvTx9Zxy30H5C199mNmD2EFiT7m4Fm0vsB0FU1X2PjL13",
        "C6m3lmIbSn2s9zb9BhEjyHp7p0354XvIWju79os45uZ7q2FibEd9nTe3rZf070hA12J57Ef96DC071Aj61bkCd1VyaN998CRH29z8wU5OX26l3BG8Zzh98s7Bx12SPeLf2RptHEc269rppl662hIv5fa5Chg3lj1aApvyHZjIAPkUVZu4Xf6gewnv1Z7fj1VYXeFqNFibHf9qT2NfJBk5oPydcWR2V4FZTWd884uGea27D",
        2,
        5
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "9dQwOXj6uyK4K7Go686Y55467nj2NITZ3WhbG0KaL281z3Lgo4WmKD0EbBEiDCeN",
        "8EBi9FMsiMLGf87ylBxi23N6y3e9o3ZagYO52NJ22iZ9v7861aZv4ok5v2gYEk7TTX94j4W1lr1fl29Cvon64Bo97imR578925gtB1qEBJp3KPRX3xcfvBIeTZiMsS06JI66tYZJFXDy0WD9lPnnO94F2CO",
        2,
        4
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "GDl6QN0nQK4QkKHOqZ5CUz4jW8Sh2U96QXsZ6ZqF7Q231Tr6I7NCsXK7k1G80b8Yv535b31I324rc06472TQ7W4Hj90X",
        "J895u0UU5",
        2,
        2
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "76xzLxk6IZkHS95KWw4HF3eE6VVRlAtys4XbP2f67Slwc1XUB1hYxK9uJ893119Af03y1YIef5bk3N0ZW6uVAUd2N1MB2I9AAO9CRO0kXemrzIhN10Tagltp4IQV57dGFhl2Nal2Bo2FymV2E7PUyArwtE4T9h5F4HZgR085C6Mv2bsdMwOj7egh2s",
        "JHh19QNiL73biZnV3Dhpvc0mas06ZiaD7MxPe3RATjjFI8yZR39ksbZAg0Wwsv558Y31hHPSpN1sHl6ru767reGdzj9dSRmjJp66vSEpuu9l3R9L3a84F1k57V2h4r",
        2,
        1
    ), (
        "The Merck Manual",
        "pdf",
        "f1aEDa2091y4LSy63BwKT5pO0R4T1",
        "9FOSSmlRZm2H08oh68SJ8Y9j52mXJR9F7uV8654P6V0r7yXVSeO30ex6425md9uRzwn36IeThe2Rp2pRFvS3tH96y2xW3w",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "DoO9Xudtd9ZTpCfJS7Yl76u5albHv1MqF5431mm0HXqB2cCNvMPdh09mI0t75HID1nwstVnKh31WDMyuuyLXmF16gb2GbrFrSQb8vF29Is67k6JlAr2g23l4661h4M7tj8dH82TlSL3zT16FJ0HAi4w3g0ZST7UFC5jYRP1p2If7q140ERljHYui18frRV",
        "7j7fs4r1plOh45KT5UdSw1U17SkQHz8RP6jBDo63UVhC3e852l6K88Q9LdftdP8i3A14562OVoH3E68Oio0A66Zmf6V",
        1,
        4
    ), (
        "The Merck Manual",
        "pdf",
        "6qsFgV48Fe88Aas9v9vvP12GdS7pgCUn23PwHQ55cT9Q8M5b0BIMTwKXqpa09g2BQn3a3M5IJeV9rp88YqwAj92k5R9K77wkV6S8R75LjOD6LAHnG53sqg5a0pJr2f3",
        "d1i4lt78zH1I3DvZ9Un2xf6XXPlJ8U83NGaoUxd33erUdo1tNtLc3I08TKUEOUhLFzH54o67cz9AQQF1xv254PcU25yp21A29HySCTemAPCb",
        1,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "y2w0aNN207FFaLLU3VioG9PeA3x5L1Wyx3nE3vkuvp2kPd067mBr9WABB2P843kbCx19EiV07a",
        "DA6QM3390k2Aj2u5oKjo0N4A8F7bvW6jQ2M0ChQ830qgJ6r7u3p1CjaQ8ZTq5787GC7wvl5C578EWf5Zy488z6M2JJ4Tbh4ajD8z9l",
        1,
        2
    ), (
        "The Merck Manual",
        "pptx",
        "5Tgas2SO485d59qRxp6T635Y5Y841Q3umW9craztLpLm3B5Gvk23SmX9tL2Db4OrqGKPVO7GZ458THVXK6IJoogP2o8AgY7PGT84aSNjD3W9EVg57eL7C3wTPQBy4Goz204T0xnh7a4377NhL09",
        "19ox0W6i56AAoVGHV2U02Z99NU6054Rac8Wa3aFy71Pa0q0R365Vwwa8Qy8twGEO64pJaf4lAzQ4pal8983a54U52m8qyL31B2gNMUL4GaV7F0y",
        1,
        4
    );