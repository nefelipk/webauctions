package entities.wrappers;

public class UserMapper {
	public static entities.User map(model.User u) {
		entities.User userEntity = new entities.User();
		userEntity.setAfm(u.getAfm());
		userEntity.setName(u.getFirstName());
		userEntity.setUsername(u.getUsername());
		userEntity.setSurname(u.getLastName());
		userEntity.setPassword(u.getPassword());
		userEntity.setEmail(u.getEmail());
		userEntity.setPhone(212333);
		entities.Location locationEntity = new entities.Location();
		model.Location location = u.getLocation();
		locationEntity.setAddress(location.getAddress());
		locationEntity.setCity(location.getCity());
		locationEntity.setCountry(location.getCountry());
		locationEntity.setItems(null);
		locationEntity.setLatitude(location.getLatitude());
		locationEntity.setLongitude(location.getLongitude());
		locationEntity.setPostalCode(location.getPostalCode());
		locationEntity.setLocation(null);
		
		
		/*fields out of model*/
		userEntity.setVerified(false);
		userEntity.setRatingBidder(0);
		userEntity.setRatingSeller(0);
		userEntity.setItems(null);
		userEntity.setBids(null);
		userEntity.setAdmin(false);
		userEntity.setMessages1(null);
		userEntity.setMessages2(null);
		
		userEntity.setLocation(locationEntity);	
		return userEntity;
	}
}
