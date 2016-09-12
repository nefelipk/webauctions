package model.wrappers;

import java.util.ArrayList;
import java.util.List;

public class UserWrapper {
	public static model.User map(entities.User entityUser) {
		if (entityUser == null)
			return null;
		model.User user = new model.User();
		user.setAdmin(entityUser.getAdmin());
		user.setAfm(entityUser.getAfm());
		user.setEmail(entityUser.getEmail());
		user.setFirstName(entityUser.getName());
		user.setId(entityUser.getIdUser());
		user.setLastName(entityUser.getSurname());
		user.setUsername(entityUser.getUsername());
		/*
		 * @TODO change phone to string String
		 */
		user.setPhone(new Integer(entityUser.getPhone()).toString());
		user.setRatingBidder(entityUser.getRatingBidder());
		user.setRatingSeller(entityUser.getRatingSeller());
		model.Location location = new model.Location();
		location.setAddress(entityUser.getLocation().getAddress());
		location.setCity(entityUser.getLocation().getCity());
		location.setCountry(entityUser.getLocation().getCountry());
		location.setLatitude(entityUser.getLocation().getLatitude());
		location.setLongitude(entityUser.getLocation().getLongitude());
		location.setPostalCode(entityUser.getLocation().getPostalCode());
		
		user.setLocation(location);

		return user;
	}

	public static List<model.User> mapList(List<entities.User> usersEntities) {
		List<model.User> allUsers = null;
		if (usersEntities != null && usersEntities.size() > 0) {
			allUsers = new ArrayList<model.User>();
			for (entities.User crawl : usersEntities) {
				model.User user = model.wrappers.UserWrapper.map(crawl);
				allUsers.add(user);
			}
		}
		return allUsers;
	}
}
