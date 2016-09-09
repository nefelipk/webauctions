package rest;

import java.sql.Timestamp;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import dao.ItemDAO;
import dao.UserDAO;
import entities.Bid;


@Path("/bid")
public class BidResource {
	
	@POST
	@Consumes({"application/json"})
	public Response placeBid(final model.Bid bid) {
		Logger LOGGER = Logger.getLogger("InfoLogging");
	    LOGGER.info(bid.getTime() + "\n ");

	    ItemDAO itemDAO = new ItemDAO();
		
		entities.Item item = itemDAO.getById(bid.getItem().getIdItem());
		
		UserDAO userDAO = new UserDAO();
		entities.User bidder = userDAO.getUserByUsername(bid.getUser().getUsername());
		
		entities.Bid b = new Bid();
		b.setAmount(bid.getAmount());
		b.setUser(bidder);
		b.setItem(item);
		b.setTime(new Timestamp(Long.valueOf(bid.getTime())));
		
		itemDAO.placeBid(b);
		return Response
				.created(UriBuilder.fromResource(MessagesResource.class)
				.build())
				.build();
	}
	
}
