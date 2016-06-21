package main.XMLMappingWrappers;

import java.util.ArrayList;
import java.util.List;

import main.XMLMapping.Category;

public class CategoryWrapper {
	public static entities.Category map(Category c) {
		entities.Category category = new entities.Category();
		category.setName(c.getvalue());
		return category;
	}
	
	public static List<entities.Category> mapList(List<Category> l) {
		List<entities.Category> categories = new ArrayList<entities.Category>();
		if(l == null || l.size() <= 0)
			return null;
		for(Category crawl : l) {
			entities.Category category = map(crawl);
			categories.add(category);
		}
		return categories;
	}
}
