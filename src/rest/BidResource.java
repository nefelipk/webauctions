package rest;

import java.sql.Timestamp;
import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import dao.ItemDAO;
import dao.UserDAO;
import entities.Bid;
import model.wrappers.BidWrapper;


@Path("/bid")
public class BidResource {
	
	@POST
	@Consumes({"application/json"})
	public Response placeBid(final model.Bid bid) {
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
	
	@GET
	@Path("/{id}")
	@Produces({"application/json"})
	public List<model.Bid> getBidsForAuction(@PathParam("id") int id) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Bid> b = itemDAO.getBidsForAuction(id);
		List<model.Bid> bids = BidWrapper.mapList(b);
		return bids;		
	}
}
