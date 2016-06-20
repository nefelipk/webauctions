package model;

import java.sql.Timestamp;
import java.util.List;
import model.Bid;
import model.Category;
import model.Image;
import model.Location;
import model.User;

public class Item {

	private int idItem;
	private String buyPrice;
	private String description;
	private Timestamp ends;
	private String firstBid;
	private String name;
	private int numberOfBids;
	private Timestamp started;
	private List<Bid> bids;
	private Bid bid;
	private Location location;
	private Image image;
	private User user;
	private List<Category> categories;

	public int getIdItem() {
		return idItem;
	}

	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}

	public String getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getEnds() {
		return ends;
	}

	public void setEnds(Timestamp ends) {
		this.ends = ends;
	}

	public String getFirstBid() {
		return firstBid;
	}

	public void setFirstBid(String firstBid) {
		this.firstBid = firstBid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfBids() {
		return numberOfBids;
	}

	public void setNumberOfBids(int numberOfBids) {
		this.numberOfBids = numberOfBids;
	}

	public Timestamp getStarted() {
		return started;
	}

	public void setStarted(Timestamp started) {
		this.started = started;
	}

	public List<Bid> getBids() {
		return bids;
	}

	public void setBids(List<Bid> bids) {
		this.bids = bids;
	}

	public Bid getBid() {
		return bid;
	}

	public void setBid(Bid bid) {
		this.bid = bid;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

}