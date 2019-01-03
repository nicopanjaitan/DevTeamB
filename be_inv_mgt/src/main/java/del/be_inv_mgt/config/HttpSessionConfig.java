package del.be_inv_mgt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.session.data.mongo.JdkMongoSessionConverter;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;

import java.time.Duration;

//Spring configuration is responsible for creating a Servlet Filter
@EnableMongoHttpSession
public class HttpSessionConfig {
    //This mechanism uses Jackson to serialize session objects to/from JSON.
    @Bean
    public JdkMongoSessionConverter jdkMongoSessionConverter() {
        return new JdkMongoSessionConverter(Duration.ofMinutes(30));
    }
}
