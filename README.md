Voici un **README.md complet, professionnel et prêt pour GitHub** pour ton projet **SunuVTC (Angular + Spring Boot)** 👇

---

# 🚗 SunuVTC - Application de Gestion VTC

## 📌 Description

**SunuVTC** est une application web complète dédiée à la gestion des services de transport VTC.
Elle permet aux administrateurs et gestionnaires de superviser efficacement les opérations liées aux chauffeurs, véhicules, courses et utilisateurs.

L’objectif principal est de fournir une solution **centralisée, sécurisée et intuitive** pour optimiser la gestion des activités VTC.

---

## 🎯 Objectifs

* Gérer les chauffeurs et leurs informations
* Suivre les véhicules disponibles
* Gérer les courses VTC
* Administrer les zones desservies
* Suivre les positions en temps réel
* Gérer les alertes et notifications
* Collecter les avis clients
* Assurer la traçabilité via les logs d’audit
* Sécuriser l’accès via authentification JWT

---

## 🏗️ Architecture

L’application repose sur une architecture **client-serveur** :

### 🔹 Frontend

* Framework : **Angular**
* Interface utilisateur dynamique et responsive
* Communication avec le backend via API REST

### 🔹 Backend

* Framework : **Spring Boot**
* API REST sécurisée
* Gestion de la logique métier et de la base de données

### 🔹 Communication

* Protocole : **HTTP / HTTPS**
* Format des données : **JSON**

---

## 📁 Structure du projet (Frontend Angular)

```
src/
 └── app/
     ├── models/        # Structures de données
     ├── services/      # Appels API
     ├── components/    # Interface utilisateur
     ├── interceptors/  # Gestion JWT
     ├── guards/        # Protection des routes
     └── app.module.ts  # Module principal
```

---

## 🧩 Modules Angular utilisés

* `BrowserModule`
* `HttpClientModule`
* `ReactiveFormsModule`
* `FormsModule`
* `RouterModule`

---

## 🖥️ Fonctionnalités principales

### 👤 Gestion des utilisateurs

* Création, modification, suppression
* Gestion des rôles

### 🚖 Gestion des chauffeurs

* Ajout / modification / suppression
* Consultation des informations

### 🚗 Gestion des véhicules

* Suivi des véhicules disponibles
* Association avec les chauffeurs

### 🗺️ Gestion des zones

* Définition des zones desservies

### 📍 Historique des positions

* Suivi des déplacements en temps réel

### 📊 Gestion des courses

* Création et suivi des courses VTC

### 🚨 Gestion des alertes

* Notifications opérationnelles

### ⭐ Avis clients

* Collecte et gestion des retours

### 💰 Historique des tarifs

* Suivi des tarifs par zone

### 📝 Logs d’audit

* Traçabilité des actions utilisateurs

---

## 🔐 Sécurité

L’application utilise une authentification basée sur **JWT (JSON Web Token)** :

* Intercepteur HTTP (`AuthInterceptor`)
* Ajout automatique du token dans les requêtes
* Protection des routes (Guards)
* Gestion des rôles utilisateurs

---

## 🔄 Navigation

* Gestion via `RouterModule`
* Navigation fluide entre les pages
* Interface claire et responsive

---

## 🧪 Technologies utilisées

### Frontend

* Angular
* TypeScript
* HTML / CSS

### Backend

* Spring Boot
* Java
* JPA / Hibernate

### Base de données

* MySQL (ou autre SGBD relationnel)

---

## ⚙️ Installation et exécution

### 🔹 1. Cloner le projet

```bash
git clone https://github.com/ton-username/sunuvtc.git
cd sunuvtc
```

---

### 🔹 2. Lancer le backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

---

### 🔹 3. Lancer le frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

---

### 🔹 4. Accéder à l’application

```
http://localhost:4200
```

---

## 📡 API REST (exemples)

| Méthode | Endpoint             | Description            |
| ------- | -------------------- | ---------------------- |
| GET     | /api/chauffeurs      | Liste des chauffeurs   |
| POST    | /api/chauffeurs      | Ajouter un chauffeur   |
| PUT     | /api/chauffeurs/{id} | Modifier un chauffeur  |
| DELETE  | /api/chauffeurs/{id} | Supprimer un chauffeur |

---

## 📸 Captures d’écran (à ajouter)

* Dashboard
* Gestion des chauffeurs
* Gestion des courses
* Interface utilisateur

---

## 🚀 Améliorations futures

* Intégration GPS en temps réel
* Notifications push
* Application mobile (Flutter / Android)
* Dashboard analytique avancé
* Intégration paiement en ligne

---

## 👨‍💻 Auteur

**Equipe DEKK MOBILITY**
eleves-ingenieurs en Informatique, Réseaux et Télécommunications.à L'IPSL
📍 Sénégal

---

## 📄 Licence

Ce projet est sous licence MIT - libre d’utilisation et de modification.

---

## ⭐ Contribution

Les contributions sont les bienvenues !

```bash
# Fork
# Create branch
git checkout -b feature/ma-fonctionnalite

# Commit
git commit -m "Ajout fonctionnalité"

# Push
git push origin feature/ma-fonctionnalite
```

---

## 🙌 Remerciements

Merci à tous ceux qui ont contribué au développement de ce projet.



