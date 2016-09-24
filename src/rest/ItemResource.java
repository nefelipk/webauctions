package rest;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import dao.ItemDAO;
import dao.LocationDAO;
import model.wrappers.ItemWrapper;

@Path("/items")
public class ItemResource {

	@GET
	@Path("/{term}")
	@Produces({"application/json"})
	public List<model.Item> generalSearch(@PathParam("term") final String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> i = itemDAO.generalSearch(term);
		List<model.Item> items = ItemWrapper.mapList(i);

		Set<model.Category> categories = new HashSet<model.Category>();
		for (model.Item crawl : items)
			for (model.Category c : crawl.getCategories())
				categories.add(c);
		model.Item allCategoriesWrapper = new model.Item();
		List<model.Category> cat = new ArrayList<model.Category>();
		cat.addAll(categories);
		allCategoriesWrapper.setCategories(cat);
		
		items.add(allCategoriesWrapper);
		return items;
	}
	
	@GET
	@Path("/top/categories/")
	@Produces({"application/json"})
	public List<String> getTopCategories() {
		ItemDAO itemDAO = new ItemDAO();
		List<String> topCategories = itemDAO.getTopCategories();
		return topCategories;
	}
	
	@GET
	@Path("/top/locations/")
	@Produces({"application/json"})
	public List<String> getTopLocations() {
		LocationDAO locationDAO = new LocationDAO();
		List<String> topLocations = locationDAO.getTopLocations();
		return topLocations;
	}
	
	
	@GET
	@Path("/category/{term}")
	@Produces({"application/json"})
	public List<model.Item> getByCategory(@PathParam("term") final String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> entitiesItems = itemDAO.getByCategory(term);
		List<model.Item> items = ItemWrapper.mapList(entitiesItems);
		logger.LoggerWA.LOGGER.log(Level.WARNING, "**************************************************\n**************************");
		logger.LoggerWA.LOGGER.log(Level.WARNING, "{0}",items.size());
		return items;
	}
	
	@GET
	@Path("/location/{term}")
	@Produces({"application/json"})
	public List<model.Item> getByLocation(@PathParam("term") final String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> entitiesItems = itemDAO.getByLocation(term);
		List<model.Item> items = ItemWrapper.mapList(entitiesItems);
		return items;
		
	}
	
	@GET
	@Path("/seller/{term}")
	@Produces({"application/json"})
	public List<model.Item> getBySeller(@PathParam("term") final String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> entitiesItems = itemDAO.getBySeller(term);
		List<model.Item> items = ItemWrapper.mapList(entitiesItems);
		return items;
		
	}

	@GET
	@Path("/price/{term}")
	@Produces({"application/json"})
	public List<model.Item> getByPrice(@PathParam("term") final String term) {
		float price = Float.valueOf(term);
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> entitiesItems = itemDAO.getByPrice(price);
		List<model.Item> items = ItemWrapper.mapList(entitiesItems);
		return items;
	}
	
	@GET
	@Path("/hot/")
	@Produces({"application/json"})
	public List<model.Item> getHotRigthNow() {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> entitiesItems = itemDAO.getHot();
		List<model.Item> items = ItemWrapper.mapList(entitiesItems);
		return items;
	}
}
