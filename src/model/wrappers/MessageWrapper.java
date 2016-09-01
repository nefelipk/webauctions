package model.wrappers;

public class MessageWrapper {
	public static model.Message map(entities.Message m) {
		model.Message message = new model.Message();
		message.setId(m.getIdMessage());
		message.setMessage(m.getMessage());
		message.setRead(m.getRead());
		//message.setReceiver(UserWrapper.map(m.getUser1()));
		//message.setSender(UserWrapper.map(m.getUser2()));
		return message;
	}
}
