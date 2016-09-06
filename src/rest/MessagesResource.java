package rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import dao.MessageDAO;
import dao.UserDAO;
import model.wrappers.MessageWrapper;

@Path("/messages")
public class MessagesResource {

	@POST
	@Consumes({"application/json"})
	public Response sendMessage(model.Message message) {
		entities.Message messageEntity = entities.wrappers.MessageWrapper.map(message);
		
		UserDAO userDAO = new UserDAO();
		entities.User receiver = userDAO.getUserByUsername(message.getReceiverUsername());
		entities.User sender = userDAO.getUserByUsername(message.getSenderUsername());
		
		messageEntity.setUser1(sender);
		messageEntity.setUser2(receiver);
		
		MessageDAO userDB = new MessageDAO();
		int id = userDB.insert(messageEntity);	
		if(id > 0) {
			return Response
				.created(UriBuilder.fromResource(UserResource.class)
				.path(String.valueOf(id))
				.build())
				.build();
		}
		else {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GET
	@Path("/{username}")
	@Produces({"application/json"})
	public List<model.Message> getMessageByUsername(@PathParam("username") String username) {
		MessageDAO messageDAO = new MessageDAO();
		List<entities.Message> m = messageDAO.getMessageByUsername(username);
		
		List<model.Message> messages = MessageWrapper.mapList(m);
		return messages;
	}
}