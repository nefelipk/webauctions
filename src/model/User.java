package model;

public class User {
	
	private String username;
	private String firstName;
	private String lastName;
	private String password;
	private int id;
	private String phone;
	private String email;
	private float ratingBidder;
	private float ratingSeller;
	private Location location;
	private boolean admin;
	private String afm;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public float getRatingBidder() {
		return ratingBidder;
	}
	public void setRatingBidder(float ratingBidder) {
		this.ratingBidder = ratingBidder;
	}
	public float getRatingSeller() {
		return ratingSeller;
	}
	public void setRatingSeller(float ratingSeller) {
		this.ratingSeller = ratingSeller;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public boolean isAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}
	public String getAfm() {
		return afm;
	}
	public void setAfm(String afm) {
		this.afm = afm;
	}	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

		
	@Override
	public String toString() {
		return this.username+" "+" "+this.firstName+" "+this.lastName+" ";
	}
}
