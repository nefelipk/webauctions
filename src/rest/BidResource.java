package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import dao.UserDAO;


@Path("/bid")
public class BidResource {
	/*
	@POST
	@Path("/{username}/{item_id}/{amount}")
	@Consumes({"application/json"})
	public Response makeBid(@PathParam("item_id") String username,@PathParam("item_id") int itemId,float amount) {
		UserDAO userDAO = new UserDAO();
		entities.User bidder = userDAO.getUserByUsername(username);
		
		
		return null;
	}
	*/
}
