package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import dao.UserDAO;

@Path("/users")
public class UserResource {
	
	@POST
	@Consumes({"application/json"})
	public Response create(final model.User user) {
		System.err.println(user.toString());
		return Response.ok().build();
		/*
		entities.User userEntity = new entities.User();
		userEntity.setAfm(user.getAfm());
		userEntity.setName(user.getFirstName());
		userEntity.setUsername(user.getUsername());
		userEntity.setSurname(user.getLastName());
		userEntity.setPassword(user.getPassword());
		
		/
		//userEntity.setPhone(user.getPhone());
		
		entities.Location locationEntity = new entities.Location();
		model.Location location = user.getLocation();
		locationEntity.setAddress(location.getAddress());
		locationEntity.setCity(location.getCity());
		locationEntity.setCountry(location.getCountry());
		locationEntity.setItems(null);
		locationEntity.setLatitude(location.getLatitude());
		locationEntity.setLongitude(location.getLongitude());
		locationEntity.setPostalCode(location.getPostalCode());
		locationEntity.setLocation(null);
		
		userEntity.setLocation(locationEntity);
		
		/*fields out of model
		userEntity.setVerified((byte)0);
		userEntity.setRatingBidder(0);
		userEntity.setRatingSeller(0);
		userEntity.setItems(null);
		userEntity.setBids(null);
		userEntity.setAdmin((byte)0);
		userEntity.setMessages1(null);
		userEntity.setMessages2(null);
		
		
		UserDAO userDB = new UserDAO();
		int id = userDB.insert(userEntity);	
		return Response
				.created(UriBuilder.fromResource(UserResource.class)
						.path(String.valueOf(id))
						.build())
				.build();
				*/
	}
}
