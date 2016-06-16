package rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import dao.LocationDAO;
import dao.UserDAO;
import model.UsernameResponse;

@Path("/users")
public class UserResource {
	
	@GET
	@Path("/{username}")
	@Produces("application/json")
	public Response checkUsername(@PathParam("username") final String username) {
		UserDAO userDAO = new UserDAO();
		UsernameResponse response = new UsernameResponse();
		response.setExists(userDAO.checkUsernames(username));
		return Response.ok(response).build();
	}
	/*
	@GET
	@Path("/{user_pass}")
	@Produces("application/json")
	public model.User getSpecificUser(@PathParam("username") final String username, 
			@MatrixParam("password") final String password) {
		UserDAO userDAO = new UserDAO();
		entities.User eUser = userDAO.getSpecificUser(username, password);
		model.User mUser = model.wrappers.UserWrapper.mapModelUserFromEntity(eUser);
		return mUser;
	}
	*/
	@POST
	@Consumes({"application/json"})
	public Response create(final model.User user) {
		entities.User userEntity = new entities.User();
		userEntity.setAfm(user.getAfm());
		userEntity.setName(user.getFirstName());
		userEntity.setUsername(user.getUsername());
		userEntity.setSurname(user.getLastName());
		userEntity.setPassword(user.getPassword());
		userEntity.setEmail(user.getEmail());
		//@TO : change phone to string in db etc. 
		userEntity.setPhone(212333);
		
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
		
		
		/*fields out of model*/
		userEntity.setVerified(false);
		userEntity.setRatingBidder(0);
		userEntity.setRatingSeller(0);
		userEntity.setItems(null);
		userEntity.setBids(null);
		userEntity.setAdmin(false);
		userEntity.setMessages1(null);
		userEntity.setMessages2(null);
		
		
		LocationDAO locationDB = new LocationDAO();
		int idLocation = locationDB.insert(locationEntity);
		
		LocationDAO location1DB = new LocationDAO();
		
		userEntity.setLocation(location1DB.getById(idLocation));
		UserDAO userDB = new UserDAO();
		int id = userDB.insert(userEntity);	
		
		return Response
				.created(UriBuilder.fromResource(UserResource.class)
						.path(String.valueOf(id))
						.build())
				.build();
			
	}
	
	@GET
	@Produces({"application/json"})
	public List<model.User> getAllUsers() {
		UserDAO userDAO = new UserDAO();
		List<entities.User> usersEntities = userDAO.getAllUsers();
		List<model.User> allUsers = null;
		if(usersEntities != null && usersEntities.size() > 0) {
			allUsers = new ArrayList<model.User>();
			for(entities.User crawl : usersEntities) {
				model.User user = model.wrappers.UserWrapper.mapModelUserFromEntity(crawl);
				allUsers.add(user);
			}
		}
		return allUsers;
	}
}
