import React, { useRef } from "react";
import "../styles/AboutUs.scss";

function AboutUs() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-us">
      <div className="navigation">
        <button type="button" onClick={() => scrollToRef(ref1)}>
          À propos
        </button>
        <button type="button" onClick={() => scrollToRef(ref2)}>
          Règles RGPD
        </button>
        <button type="button" onClick={() => scrollToRef(ref3)}>
          Conditions d'utilisation
        </button>
      </div>
      <div className="about-us-modal">
        <div className="section" ref={ref1}>
          <h2>À propos de Serenity</h2>
          <p>
            Serenity est une application dédiée aux patients et aux
            professionnels de santé. Notre but est de faciliter la compréhension
            des patients vis-à-vis de leurs interventions médicales en
            fournissant diverses ressources et un suivi adapté. L'accompagnement
            du patient est au cœur de notre mission. Nous travaillons avec une
            équipe de spécialistes médicaux pour assurer que notre contenu est
            précis, à jour et facile à comprendre. Notre application est conçue
            pour être intuitive et conviviale, que vous soyez un patient, un
            professionnel de santé ou un aidant. Notre objectif est de vous
            aider à naviguer dans le paysage complexe des soins de santé avec
            sérénité et confiance.
          </p>
        </div>
        <div className="section" ref={ref2}>
          <h2>Règles RGPD</h2>
          <p>
            Dans le cadre du Règlement Général sur la Protection des Données
            (RGPD), Serenity s'engage à protéger les données de ses
            utilisateurs. Toutes les informations personnelles que nous
            recueillons sont utilisées uniquement pour fournir nos services et
            ne sont partagées avec aucun tiers non autorisé. Vous avez le droit
            d'accéder à vos données, de les rectifier, de les supprimer, de
            limiter leur traitement et de vous opposer à leur traitement. Nous
            utilisons des mesures de sécurité de pointe pour garantir que vos
            informations sont protégées et que votre confidentialité est
            respectée à tout moment. Nous comprenons l'importance de la
            protection des données et nous nous engageons à être transparents
            sur la manière dont nous recueillons, utilisons et protégeons vos
            informations personnelles.
          </p>
        </div>
        <div className="section" ref={ref3}>
          <h2>Conditions d'utilisation</h2>
          <p>
            En utilisant Serenity, vous acceptez de respecter nos conditions
            d'utilisation. Ces conditions incluent l'engagement à ne pas
            utiliser l'application pour des fins illégales ou non autorisées, à
            ne pas tenter de compromettre la sécurité de l'application, et à
            fournir des informations exactes et à jour lors de la création de
            votre compte. Nous nous réservons le droit de suspendre ou de
            supprimer tout compte qui enfreint ces conditions. Les utilisateurs
            sont également tenus de respecter tous les droits de propriété
            intellectuelle associés au contenu de l'application. Tout contenu
            inapproprié ou illégal peut être signalé pour examen et peut
            entraîner la suspension ou la suppression de l'utilisateur concerné.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
