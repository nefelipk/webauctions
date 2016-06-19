package model.wrappers;

public class LocationWrapper {
	public static model.Location map(entities.Location l) {
		model.Location location = new model.Location();
		location.setAddress(l.getAddress());
		location.setCity(l.getCity());
		location.setCountry(l.getCountry());
		location.setLatitude(l.getLatitude());
		location.setLocation(l.getLocation());
		location.setLongitude(l.getLongitude());
		location.setPostalCode(l.getPostalCode());
		return location;
	}
}
