package rest;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import dao.ItemDAO;
import model.wrappers.ItemWrapper;

@Path("/items")
public class ItemResource {

	@GET
	@Path("/{term}")
	@Produces({ "application/json" })
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

}
