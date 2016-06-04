package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;
import java.sql.Timestamp;


/**
 * The persistent class for the Item database table.
 * 
 */
@Entity
@NamedQuery(name="Item.findAll", query="SELECT i FROM Item i")
public class Item implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int idItem;
	
	private String name;
	
	@Column(name="buy_price")
	private String buyPrice;
	
	@Column(name="first_bid")
	private String firstBid;
	
	@Column(name="number_of_bids")
	private int numOfBids;
	
	private Timestamp started;
	
	private Timestamp ends;
	
	private String description;
	
	//bi-directional one-to-one association to Location
	@OneToOne(mappedBy="item")
	private Location location;
	
	//bi-directional one-to-one association to Bid
	@OneToOne(mappedBy="itemMaxBid")
	private Bid currently;
	
	//bi-directional many-to-one association to Bid
	@OneToMany(mappedBy="item")
	private List<Bid> bids;
	
	//bi-directional many-to-one association to Image
	@OneToMany(mappedBy="item")
	private List<Image> images;
	
	//bi-directional many-to-many association to Category
	@ManyToMany(mappedBy="items")
	private List<Category> categories;
	
	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idSeller")
	private User seller;

	public Item() {
	}

	public int getIdItem() {
		return this.idItem;
	}

	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBuyPrice() {
		return this.buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getFirstBid() {
		return this.firstBid;
	}

	public void setFirstBid(String firstBid) {
		this.firstBid = firstBid;
	}

	public int getNumOfBids() {
		return this.numOfBids;
	}

	public void setNumOfBids(int numOfBids) {
		this.numOfBids = numOfBids;
	}

	public Timestamp getStarted() {
		return this.started;
	}

	public void setStarted(Timestamp started) {
		this.started = started;
	}

	public Timestamp getEnds() {
		return this.ends;
	}

	public void setEnds(Timestamp ends) {
		this.ends = ends;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Bid getCurrently() {
		return this.currently;
	}

	public void setCurrently(Bid currently) {
		this.currently = currently;
	}
	
	public List<Bid> getBids() {
		return this.bids;
	}

	public void setBids(List<Bid> bids) {
		this.bids = bids;
	}

	public Bid addBid(Bid bid) {
		getBids().add(bid);
		bid.setItem(this);

		return bid;
	}

	public Bid removeBid(Bid bid) {
		getBids().remove(bid);
		bid.setItem(null);

		return bid;
	}
	
	public List<Image> getImages() {
		return this.images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}
	
	public Image addImage(Image image) {
		getImages().add(image);
		image.setItem(this);

		return image;
	}

	public Image removeImage(Image image) {
		getImages().remove(image);
		image.setItem(null);

		return image;
	}
	
	public List<Category> getCategories() {
		return this.categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
	
	public User getSeller() {
		return this.seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}
	
}
