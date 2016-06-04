package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the Location database table.
 * 
 */
@Entity
@NamedQuery(name="Location.findAll", query="SELECT l FROM Location l")
public class Location implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int idLocation;
	
	private String country;

	private String city;

	private String address;

	@Column(name="postal_code")
	private int postalCode;
	
	private float latitude;

	private float longitude;

	private String location;
	
	//bi-directional one-to-one association to Item
	@OneToOne
	@JoinColumn(name="idLocation", referencedColumnName="idLocation")
	private Item item;

	//bi-directional one-to-one association to User
	@OneToOne
	@JoinColumn(name="idLocation", referencedColumnName="idLocation")
	private User user;

	public Location() {
	}

	public int getIdLocation() {
		return this.idLocation;
	}

	public void setIdLocation(int idLocation) {
		this.idLocation = idLocation;
	}
	
	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public int getPostalCode() {
		return this.postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}

	public float getLatitude() {
		return this.latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return this.longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Item getItem() {
		return this.item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}