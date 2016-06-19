package model.wrappers;

import java.util.ArrayList;
import java.util.List;

public class CategoryWrapper {
	public static model.Category map(entities.Category c) {
		model.Category category = new model.Category();
		category.setName(c.getName());
		return category;
	}
	
	public static List<model.Category> mapList(List<entities.Category> c) {
		List<model.Category> categories = null;
		if(c != null && c.size() > 0) {
			categories = new ArrayList<model.Category>();
			for(entities.Category crawl : c) {
				model.Category category = CategoryWrapper.map(crawl);
				categories.add(category);
			}
		}
		return categories;
	}
}
