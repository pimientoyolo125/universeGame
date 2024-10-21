package universeGame.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenUtil {

    private final static String SECRET = "universeGameSecretKey1234567890!";
    private final static Long EXPIRATION_TIME = 86400000L;

    public static String createToken(String nombre, String email, Long type){
        Long expiration = EXPIRATION_TIME*1000;
        Date expirationDate = new Date(System.currentTimeMillis() + expiration);

        Map<String, Object> extra = new HashMap<>();
        extra.put("correo", email);
        extra.put("nombre", nombre);
        extra.put("tipo", type);

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();
    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token){
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();

            if (email == null || email.isEmpty()) {
                return null;
            }

            return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
        } catch (JwtException | IllegalArgumentException e){
        }

        return null;
    }
}
