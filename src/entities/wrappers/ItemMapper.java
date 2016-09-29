package entities.wrappers;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ItemMapper {
	public static Timestamp convertToTimestamp(String dateTime) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		try {
			Date date = (Date) dateFormat.parse(dateTime);
			Timestamp stamp = new Timestamp(date.getTime());
			return stamp;
		} catch (ParseException e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public static entities.Item map(model.Item i) {
		entities.Item itemEntity = new entities.Item();
		itemEntity.setIdItem(i.getIdItem());
		itemEntity.setName(i.getName());
		itemEntity.setDescription(i.getDescription());
		itemEntity.setBuyPrice(i.getBuyPrice());
		itemEntity.setFirstBid(i.getFirstBid());
		itemEntity.setCurrently(Float.parseFloat(i.getFirstBid()));
		itemEntity.setStarted(convertToTimestamp(i.getStarted()));
		itemEntity.setEnds(convertToTimestamp(i.getEnds()));
		itemEntity.setNumberOfBids(i.getNumberOfBids());
		
		itemEntity.setLocation(LocationWrapper.map(i.getLocation()));
		itemEntity.setUser(UserMapper.map(i.getUser()));
		itemEntity.setCategories(CategoryWrapper.mapList(i.getCategories()));
		itemEntity.setImage(ImageWrapper.map(i.getImage()));
		itemEntity.setBids(null);
		
		return itemEntity;
	}
}
