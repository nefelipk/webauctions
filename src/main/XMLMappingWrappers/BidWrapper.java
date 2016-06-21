package main.XMLMappingWrappers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import main.XMLMapping.Bid;
import main.XMLMapping.Bids;

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
		bid.setAmount(Float.valueOf(b.getAmount()));
		bid.setTime(Timestamp.valueOf(b.getTime()));
		bid.setUser(UserWrapper.mapBidder(b.getBidder()));
		return bid;
	}
}
