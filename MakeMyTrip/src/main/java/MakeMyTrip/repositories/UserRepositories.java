package MakeMyTrip.repositories;
import MakeMyTrip.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepositories extends MongoRepository<Users,String>{
     Users findByEmail(String email);
}
