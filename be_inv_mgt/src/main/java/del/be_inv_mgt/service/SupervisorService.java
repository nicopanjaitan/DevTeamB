package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Supervisor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupervisorService {
    List<Supervisor> getAllSupervisor();

    Supervisor getSupervisorById(String supervId);

    Supervisor createSupervisor(Supervisor supervisor);

    Supervisor updateSupervisorById(String supervId, Supervisor supervisor);

    int deleteSupervisorById(String supervId);
}
