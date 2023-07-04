import React from "react";
import { Link } from "react-scroll";
import HeaderLocation from "./HeaderLocation";
import "../styles/AboutUs.scss";

function AboutUs() {
  return (
    <>
      <HeaderLocation />
      <div className="about-us-modal">
        <div className="about">
          <div className="navigation">
            <Link
              activeClass="active"
              to="section1"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Serenity
            </Link>
            <Link
              activeClass="active"
              to="section2"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Les praticiens
            </Link>
            <Link
              activeClass="active"
              to="section3"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Les patients
            </Link>
            <Link
              activeClass="active"
              to="section4"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Les administrateurs
            </Link>
          </div>
          <div className="section">
            <h2>À propos de Serenity</h2>
            <p>
              Serenity est une application conçue pour faciliter la gestion des
              praticiens et des patients. Nous fournissons une plateforme qui
              permet à chaque utilisateur de profiter d'un espace personnel pour
              améliorer l'efficacité et la clarté des informations.
            </p>
            <h2>Pour les praticiens</h2>
            <p>
              Les praticiens ont la possibilité d'ajouter différentes ressources
              pour accompagner le patient dans ses démarches et sa compréhension
              de l'intervention qu'il va subir. Notre objectif est de permettre
              aux praticiens d'accompagner efficacement les patients tout au
              long de leur parcours médical.
            </p>
            <h2>Pour les patients</h2>
            <p>
              Les patients peuvent visualiser clairement les détails de leur
              opération, favorisant ainsi une meilleure compréhension de leur
              situation. Notre plateforme est conçue pour que les patients
              abordent leur intervention avec sérénité, en sachant qu'ils sont
              entre de bonnes mains.
            </p>
            <h2>Pour les administrateurs</h2>
            <p>
              Les administrateurs ont le pouvoir d'ajouter des praticiens à la
              plateforme, garantissant ainsi un contrôle rigoureux de la qualité
              des professionnels de santé disponibles pour les patients. Grâce à
              cette fonctionnalité, nous nous assurons que seuls les praticiens
              les plus compétents sont présents sur Serenity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
