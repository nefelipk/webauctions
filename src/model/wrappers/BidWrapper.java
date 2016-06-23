package model.wrappers;

import java.util.ArrayList;
import java.util.List;

public class BidWrapper {
	public static model.Bid map(entities.Bid b) {
		model.Bid bid = new model.Bid();
		bid.setAmount(b.getAmount());
		bid.setTime(b.getTime());
		bid.setUser(UserWrapper.map(b.getUser()));
		//bid.setItem(ItemWrapper.map(b.getItem()));
		return bid;
	}
	
	public static List<model.Bid> mapList(List<entities.Bid> bidsEntities) {
		List<model.Bid> bids = null;
		if(bidsEntities != null && bidsEntities.size() > 0) {
			bids = new ArrayList<model.Bid>();
			for (entities.Bid crawl : bidsEntities) {
				model.Bid bid = model.wrappers.BidWrapper.map(crawl);
				bids.add(bid);
			}
		}
		return bids;
	}
}
