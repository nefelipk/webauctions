package rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import dao.ItemDAO;
import model.Item;
import model.wrappers.ItemWrapper;

@Path("/items")
public class ItemResource {
	
	@GET
	@Path("/{term}")
	@Produces({"application/json"})
	public List<Item> generalSearch(String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> i = itemDAO.generalSearch(term);
		List<model.Item> items = ItemWrapper.mapList(i);
		return items;		
	}
	
}
