package model.wrappers.toXML;

public class ItemWrapper {
	public static main.XMLMapping.Item map(model.Item i) {
		main.XMLMapping.Item item = new main.XMLMapping.Item();
		item.setBids(model.wrappers.toXML.BidWrapper.map(i.getBids()));
		item.setBuyPrice(i.getBuyPrice());
		item.setCountry(i.getLocation().getCountry());
		if(i.getBid() == null)
			item.setCurrently("");
		else
			item.setCurrently(new Float(i.getBid().getAmount()).toString());
		item.setDescription(i.getDescription());
		item.setEnds(i.getEnds());
		item.setFirstBid(i.getFirstBid());
		item.setItemID(new Integer(i.getIdItem()).toString());
		item.setLocation(model.wrappers.toXML.LocationWrapper.map(i.getLocation()));
		item.setName(i.getName());
		item.setNumberOfBids(new Integer(i.getNumberOfBids()).toString());
		item.setSeller(model.wrappers.toXML.SellerWrapper.map(i.getUser()));
		item.setStarted(i.getStarted());
		return item;
	}
}
