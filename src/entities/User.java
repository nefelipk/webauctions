package entities;

import java.io.Serializable;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the User database table.
 * 
 */
@Entity
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
@Table(name="User")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idUser;

	private boolean admin;

	private String afm;

	private String email;

	private String name;

	private String password;

	private int phone;

	@Column(name="rating_bidder")
	private float ratingBidder;

	@Column(name="rating_seller")
	private float ratingSeller;

	private String surname;

	private String username;

	private boolean verified;

	//bi-directional many-to-one association to Bid
	@OneToMany(mappedBy="user")
	private List<Bid> bids;

	//bi-directional many-to-one association to Item
	@OneToMany(mappedBy="user")
	private List<Item> items;

	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="user1")
	private List<Message> messages1;

	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="user2")
	private List<Message> messages2;

	//bi-directional many-to-one association to Location
	@ManyToOne(cascade=CascadeType.PERSIST)
	@JoinColumn(name="idLocation")
	private Location location;

	public User() {
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public boolean getAdmin() {
		return this.admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public String getAfm() {
		return this.afm;
	}

	public void setAfm(String afm) {
		this.afm = afm;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getPhone() {
		return this.phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public float getRatingBidder() {
		return this.ratingBidder;
	}

	public void setRatingBidder(float ratingBidder) {
		this.ratingBidder = ratingBidder;
	}

	public float getRatingSeller() {
		return this.ratingSeller;
	}

	public void setRatingSeller(float ratingSeller) {
		this.ratingSeller = ratingSeller;
	}

	public String getSurname() {
		return this.surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean getVerified() {
		return this.verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public List<Bid> getBids() {
		return this.bids;
	}

	public void setBids(List<Bid> bids) {
		this.bids = bids;
	}

	public Bid addBid(Bid bid) {
		getBids().add(bid);
		bid.setUser(this);

		return bid;
	}

	public Bid removeBid(Bid bid) {
		getBids().remove(bid);
		bid.setUser(null);
		return bid;
	}

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Item addItem(Item item) {
		getItems().add(item);
		item.setUser(this);

		return item;
	}

	public Item removeItem(Item item) {
		getItems().remove(item);
		item.setUser(null);

		return item;
	}

	public List<Message> getMessages1() {
		return this.messages1;
	}

	public void setMessages1(List<Message> messages1) {
		this.messages1 = messages1;
	}

	public Message addMessages1(Message messages1) {
		getMessages1().add(messages1);
		messages1.setUser1(this);

		return messages1;
	}

	public Message removeMessages1(Message messages1) {
		getMessages1().remove(messages1);
		messages1.setUser1(null);

		return messages1;
	}

	public List<Message> getMessages2() {
		return this.messages2;
	}

	public void setMessages2(List<Message> messages2) {
		this.messages2 = messages2;
	}

	public Message addMessages2(Message messages2) {
		getMessages2().add(messages2);
		messages2.setUser2(this);

		return messages2;
	}

	public Message removeMessages2(Message messages2) {
		getMessages2().remove(messages2);
		messages2.setUser2(null);

		return messages2;
	}

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}