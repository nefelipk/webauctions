package entities;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


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

	@Column(name="buy_price")
	private String buyPrice;

	@Lob
	private String description;

	private Timestamp ends;

	@Column(name="first_bid")
	private String firstBid;

	private String name;

	@Column(name="number_of_bids")
	private int numberOfBids;

	private Timestamp started;

	//bi-directional many-to-one association to Bid
	@OneToMany(mappedBy="item")
	private List<Bid> bids;

	//bi-directional many-to-one association to Bid
	@ManyToOne
	@JoinColumn(name="currently")
	private Bid bid;

	//bi-directional many-to-one association to Location
	@ManyToOne
	@JoinColumn(name="idLocation")
	private Location location;

	//bi-directional many-to-one association to Image
	@ManyToOne
	@JoinColumn(name="idImage")
	private Image image;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idSeller")
	private User user;

	//bi-directional many-to-many association to Category
	@ManyToMany(mappedBy="items")
	private List<Category> categories;

	public Item() {
	}

	public int getIdItem() {
		return this.idItem;
	}

	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}

	public String getBuyPrice() {
		return this.buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getEnds() {
		return this.ends;
	}

	public void setEnds(Timestamp ends) {
		this.ends = ends;
	}

	public String getFirstBid() {
		return this.firstBid;
	}

	public void setFirstBid(String firstBid) {
		this.firstBid = firstBid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfBids() {
		return this.numberOfBids;
	}

	public void setNumberOfBids(int numberOfBids) {
		this.numberOfBids = numberOfBids;
	}

	public Timestamp getStarted() {
		return this.started;
	}

	public void setStarted(Timestamp started) {
		this.started = started;
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

	public Bid getBid() {
		return this.bid;
	}

	public void setBid(Bid bid) {
		this.bid = bid;
	}

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Image getImage() {
		return this.image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Category> getCategories() {
		return this.categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

}