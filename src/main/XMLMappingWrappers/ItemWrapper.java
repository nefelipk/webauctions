package main.XMLMappingWrappers;

import java.util.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import main.XMLMapping.Item;
import main.XMLMapping.Items;

public class ItemWrapper {
	public static List<entities.Item> mapList(Items i) {
		List<entities.Item> items = new ArrayList<entities.Item>();
		if (i != null && i.getItem().size() > 0) {
			for (Item crawl : i.getItem()) {
				entities.Item item = ItemWrapper.map(crawl);
				items.add(item);
			}
		}
		return items;
	}

	public static Timestamp convertToTimestamp(String dateTime) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM-dd-yy HH:mm:ss");
		try {
			Date date = (Date) dateFormat.parse(dateTime);
			Timestamp stamp = new Timestamp(date.getTime());
			return stamp;
		} catch (ParseException e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public static entities.Item map(Item i) {
		entities.Item item = new entities.Item();
		item.setIdItem(Integer.valueOf(i.getItemID()));
		String currently = i.getCurrently();
		currently = currently.replace("$","");
		currently = currently.replace(",","");
		item.setCurrently(Float.valueOf(currently));
		if(i.getBuyPrice() == null) 
			item.setBuyPrice("0");
		else 
			item.setBuyPrice(i.getBuyPrice());
		item.setDescription(i.getDescription());
		item.setFirstBid(i.getFirstBid());
		item.setCategories(CategoryWrapper.mapList(i.getCategory()));
		item.setLocation(LocationWrapper.map(i.getLocation(), i.getCountry()));
		item.setNumberOfBids(Integer.valueOf(i.getNumberOfBids()));
		item.setStarted(convertToTimestamp(i.getStarted()));
		item.setEnds(convertToTimestamp(i.getEnds()));
		
		item.setName(i.getName());
		item.setUser(UserWrapper.mapSeller(i.getSeller()));
		item.setBids(BidWrapper.mapList(i.getBids()));
		return item;
	}
	
}
