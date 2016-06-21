package main.XMLMappingWrappers;

import java.util.ArrayList;
import java.util.List;

import main.XMLMapping.Bidder;
import main.XMLMapping.Seller;

public class UserWrapper {
	public static entities.User mapBidder(Bidder bidder) {
		entities.User user = RandomUserGenerator.createRandomUser();
		user.setUsername(bidder.getUserID());
		user.setRatingBidder(Float.valueOf(bidder.getRating()));
		user.setLocation(LocationWrapper.map(bidder.getLocation(),bidder.getCountry()));
		return user;
	}
	
	public static entities.User mapSeller(Seller seller) {
		entities.User user = RandomUserGenerator.createRandomUser();
		user.setUsername(seller.getUserID());
		user.setRatingBidder(Float.valueOf(seller.getRating()));
		user.setLocation(LocationWrapper.map(null,"USA"));
		return user;
	}
	
	public List<entities.User> mapList(List<Bidder> bidders) {
		List<entities.User> users = new ArrayList<entities.User>();
		if(bidders == null || bidders.size() <= 0)
			return null;
		for(Bidder crawl : bidders) {
			entities.User user = mapBidder(crawl);
			users.add(user);
		}
		return users;
	}
}
