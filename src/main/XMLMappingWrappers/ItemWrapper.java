package main.XMLMappingWrappers;

import java.sql.Date;
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
		SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-yy HH:mm:ss");
		try {
			Date date = (Date) dateFormat.parse(dateTime);
			Timestamp stamp = new Timestamp(date.getTime());
			return stamp;
		} catch (ParseException e) {
			return null;
		}
	}
	
	public static entities.Item map(Item i) {
		entities.Item item = new entities.Item();
		if (i.getBids().getBid().size() > 0)
			item.setBid(BidWrapper.map(i.getBids().getBid().get(1)));
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