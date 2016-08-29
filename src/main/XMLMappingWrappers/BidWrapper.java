package main.XMLMappingWrappers;

import java.util.ArrayList;
import java.util.List;

import main.XMLMapping.Bid;
import main.XMLMapping.Bids;
import main.XMLMapping.Item;

public class BidWrapper {
	public static List<entities.Bid> mapList(Bids b) {
		List<entities.Bid> bids = new ArrayList<entities.Bid>();
		if(b != null && b.getBid().size() > 0) {
			for(Bid crawl : b.getBid()) {
				entities.Bid bid = BidWrapper.map(crawl);
				bids.add(bid);
			}
		}
		return bids;
	}
	
	public static entities.Bid map(Bid b) {
		entities.Bid bid = new entities.Bid();
		if(b == null)
			return null;
		String amount = b.getAmount();
		amount = amount.replace("$","");
		amount = amount.replace(",","");
		bid.setAmount(Float.valueOf(amount));
		bid.setTime(ItemWrapper.convertToTimestamp(b.getTime()));
		bid.setUser(UserWrapper.mapBidder(b.getBidder()));
		return bid;
	}
}
