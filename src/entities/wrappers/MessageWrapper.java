package entities.wrappers;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MessageWrapper {
	private static final Logger LOGGER = Logger.getLogger( MessageWrapper.class.getName() );

	public static entities.Message map(model.Message m) {
		entities.Message message = new entities.Message();
		message.setMessage(m.getMessage());
		message.setRead(false);
		Timestamp time = new Timestamp(Long.valueOf(m.getTime()));
		message.setTime(time);
		message.setDeleted_by_receiver(false);
		message.setDeleted_by_sender(false);
		return message;
	}
}
