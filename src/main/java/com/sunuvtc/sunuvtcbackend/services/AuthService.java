package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.AuthRequest;
import com.sunuvtc.sunuvtcbackend.dtos.AuthResponse;
import com.sunuvtc.sunuvtcbackend.dtos.RegisterRequest;
import com.sunuvtc.sunuvtcbackend.dtos.UserDTO;
import com.sunuvtc.sunuvtcbackend.entities.User;
import com.sunuvtc.sunuvtcbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse login(AuthRequest authRequest) {
        // Recherche de l'utilisateur par nom d'utilisateur
        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(false, "Utilisateur non trouvé");
        }

        // Vérification simple du mot de passe (en clair pour la simplicité)
        // En production, utilisez BCryptPasswordEncoder
        if (!user.getPassword().equals(authRequest.getPassword())) {
            return new AuthResponse(false, "Mot de passe incorrect");
        }

        // Génération d'un token simple (UUID)
        String token = UUID.randomUUID().toString();

        // Conversion en DTO
        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getPhone()
        );

        return new AuthResponse(true, "Connexion réussie", userDTO, token);
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        // Vérification si l'utilisateur existe déjà
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new AuthResponse(false, "Ce nom d'utilisateur est déjà utilisé");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new AuthResponse(false, "Cet email est déjà utilisé");
        }

        // Création du nouvel utilisateur
        User user = new User(
                registerRequest.getUsername(),
                registerRequest.getPassword(), // Stockage en clair pour la simplicité
                registerRequest.getEmail(),
                registerRequest.getFullName(),
                registerRequest.getPhone()
        );

        // Sauvegarde
        User savedUser = userRepository.save(user);

        // Génération du token
        String token = UUID.randomUUID().toString();

        // Conversion en DTO
        UserDTO userDTO = new UserDTO(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getPhone()
        );

        return new AuthResponse(true, "Inscription réussie", userDTO, token);
    }

    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}





