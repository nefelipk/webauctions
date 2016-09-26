package model.wrappers.toXML;

import java.util.List;

public class BidWrapper {
	public static main.XMLMapping.Bids map(List<model.Bid> b) {
		main.XMLMapping.Bids bids = new main.XMLMapping.Bids();
		for(model.Bid crawl : b) {
			bids.getBid().add(model.wrappers.toXML.BidWrapper.map(crawl));
		}
		return bids;
	}
	
	public static main.XMLMapping.Bid map(model.Bid b) {
		main.XMLMapping.Bid bid = new main.XMLMapping.Bid();
		bid.setAmount(new Float(b.getAmount()).toString());
		bid.setTime(b.getTime());
		bid.setBidder(model.wrappers.toXML.BidderWrapper.map(b.getUser()));
		return bid;
	}
}
