package model.wrappers;

import java.util.ArrayList;
import java.util.List;

public class ItemWrapper {
	public static model.Item map(entities.Item i) {
		model.Item item = new model.Item();
		
		//item.setBid(BidWrapper.map(i.getBid()));
		item.setBids(BidWrapper.mapList(i.getBids()));
		item.setFirstBid(i.getFirstBid());
		item.setBuyPrice(i.getBuyPrice());
		
		item.setCategories(CategoryWrapper.mapList(i.getCategories()));
		item.setDescription(i.getDescription());

		item.setStarted(i.getStarted());
		item.setEnds(i.getEnds());
		
		item.setImage(ImageWrapper.map(i.getImage()));
		item.setUser(UserWrapper.map(i.getUser()));

		item.setLocation(LocationWrapper.map(i.getLocation()));
		
		item.setName(i.getName());
		item.setNumberOfBids(i.getNumberOfBids());
		return item; 
	}
	
	public static List<model.Item> mapList(List<entities.Item> i) {
		List<model.Item> items = null;
		if(i != null && i.size() > 0) {
			items = new ArrayList<model.Item>();
			for(entities.Item crawl : i) {
				model.Item item = ItemWrapper.map(crawl);
				items.add(item);
			}
		}
		return items;
	}
}
