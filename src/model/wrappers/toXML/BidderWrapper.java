package model.wrappers.toXML;


public class BidderWrapper {
	public static main.XMLMapping.Bidder map(model.User u) {
		main.XMLMapping.Bidder bidder = new main.XMLMapping.Bidder();
		bidder.setCountry(u.getLocation().getCountry());
		bidder.setLocation(model.wrappers.toXML.LocationWrapper.map(u.getLocation()));
		bidder.setRating(new Float(u.getRatingBidder()).toString());
		bidder.setUserID(new Integer(u.getId()).toString());
		return bidder;
	}
}
