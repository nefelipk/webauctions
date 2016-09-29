package entities.wrappers;

import java.util.ArrayList;
import java.util.List;

public class CategoryWrapper {
	public static entities.Category map(model.Category c) {
		entities.Category category = new entities.Category();
		category.setName(c.getName());
		//category.setItems(ItemWrapper.mapList(c.getItems()));
		return category;
	}
	
	public static List<entities.Category> mapList(List<model.Category> c) {
		List<entities.Category> categories = null;
		if(c != null && c.size() > 0) {
			categories = new ArrayList<entities.Category>();
			for(model.Category crawl : c) {
				entities.Category category = CategoryWrapper.map(crawl);
				categories.add(category);
			}
		}
		return categories;
	}
}
