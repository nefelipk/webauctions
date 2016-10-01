package rest;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import dao.ItemDAO;
import dao.LocationDAO;
import entities.wrappers.ItemMapper;
import entities.wrappers.UserMapper;
import model.wrappers.CategoryWrapper;
import model.wrappers.ItemWrapper;

@Path("/items")
public class ItemResource {
	
	@POST
	@Consumes({"application/json", MediaType.MULTIPART_FORM_DATA})
	public Response create(final model.Item item) {
		entities.Item itemEntity = new entities.Item();
		itemEntity.setName(item.getName());
		itemEntity.setBuyPrice(item.getBuyPrice());
		itemEntity.setFirstBid(item.getFirstBid());
		itemEntity.setCurrently(Float.parseFloat(item.getFirstBid()));

		itemEntity.setStarted(entities.wrappers.ItemMapper.convertToTimestamp(item.getStarted()));
		itemEntity.setEnds(entities.wrappers.ItemMapper.convertToTimestamp(item.getEnds()));
		itemEntity.setDescription(item.getDescription());
		
		entities.Location locationEntity = new entities.Location();
		model.Location location = item.getLocation();
		locationEntity.setAddress(location.getAddress());
		locationEntity.setCity(location.getCity());
		locationEntity.setCountry(location.getCountry());
		locationEntity.setUsers(null);
		System.err.println("lat: " + location.getLatitude());
		System.err.println("long: " + location.getLongitude());
		locationEntity.setLatitude(location.getLatitude());
		locationEntity.setLongitude(location.getLongitude());
		locationEntity.setPostalCode(location.getPostalCode());
		locationEntity.setLocation(location.getLocation());
		itemEntity.setLocation(locationEntity);
		
		List<entities.Category> categoriesEntity = new ArrayList<entities.Category>();
		List<model.Category> categories = item.getCategories();
		for(model.Category category: categories) {
			entities.Category categoryEntity = new entities.Category();
			categoryEntity.setName(category.getName());
			categoryEntity.setItems(null);
			categoriesEntity.add(categoryEntity);
		}
		itemEntity.setCategories(categoriesEntity);
		
		entities.Image imageEntity = new entities.Image();
		model.Image image = item.getImage();
		if (image != null) {
			imageEntity.setImage(image.getImage());
			itemEntity.setImage(imageEntity);
		}
		
		entities.User userEntity = UserMapper.map(item.getUser());
		itemEntity.setUser(userEntity);
		
		itemEntity.setBids(null);
		itemEntity.setNumberOfBids(0);
		
		ItemDAO itemDB = new ItemDAO();
		int id = itemDB.insert(itemEntity);
		if (id >= 0) {
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
	
	@DELETE
	@Path("/delete/{term}")
	@Consumes({"application/json"})
	public Response deleteItem(@PathParam("term") final String term) {
		ItemDAO itemDB = new ItemDAO();
		itemDB.deleteItem(Integer.parseInt(term));
		return Response
			.created(UriBuilder.fromResource(UserResource.class)
					.build())
			.build();
	}
	
	@POST
	@Path("/update/")
	@Consumes({"application/json"})
	public Response updateItem(final model.Item item) {
		entities.Item itemEntity = ItemMapper.map(item);
		ItemDAO itemDB = new ItemDAO();
		itemDB.updateItem(itemEntity);
		return Response
				.created(UriBuilder.fromResource(UserResource.class)
						.build())
				.build();
	}
	
	@GET
	@Path("/{term}")
	@Produces({"application/json"})
	public List<model.Item> generalSearch(@PathParam("term") final String term) {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Item> i = itemDAO.generalSearch(term);
		List<model.Item> items = ItemWrapper.mapList(i);

		Set<model.Category> categories = new HashSet<model.Category>();
		if (items == null) return null;
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
	@Path("/allcategories/")
	@Produces({"application/json"})
	public List<model.Category> getAllCategories() {
		ItemDAO itemDAO = new ItemDAO();
		List<entities.Category> categoriesEntities = itemDAO.getAllCategories();
		List<model.Category> allCategories = CategoryWrapper.mapList(categoriesEntities);
		return allCategories;
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
	
	@GET
	@Path("/download/{id}")
	@Produces({"text/xml"})
	public main.XMLMapping.Item downloadAuctionXML(@PathParam("id") int id) {
		ItemDAO itemDAO = new ItemDAO();
		entities.Item entityItem = itemDAO.getById(id);
		model.Item modelItem = model.wrappers.ItemWrapper.map(entityItem);
		main.XMLMapping.Item itemXML = model.wrappers.toXML.ItemWrapper.map(modelItem);
		return itemXML;
	}

	@GET
	@Path("/id/{id}")
	@Produces({"application/json"})
	public model.Item getById(@PathParam("id") int id) {
		ItemDAO itemDAO = new ItemDAO();
		entities.Item entityItem = itemDAO.getById(id);
		model.Item modelItem = model.wrappers.ItemWrapper.map(entityItem);
		return modelItem;
	}
}
