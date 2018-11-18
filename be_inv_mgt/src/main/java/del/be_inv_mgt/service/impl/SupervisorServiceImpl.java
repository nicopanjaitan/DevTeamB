package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.model.Supervisor;
import del.be_inv_mgt.repository.SupervisorRepository;
import del.be_inv_mgt.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupervisorServiceImpl implements SupervisorService {
    @Autowired
    private SupervisorRepository supervisorRepository;

    public List<Supervisor> getAllSupervisor(){
        return supervisorRepository.findAll();
    }

    public Supervisor getSupervisorById(String supervId){
        return supervisorRepository.findBy_id(supervId);
    }

    public Supervisor createSupervisor(Supervisor supervisor){
        return supervisorRepository.save(supervisor);
    }

    public Supervisor updateSupervisorById(String supervId, Supervisor supervisor) {
        supervisor.set_id(supervId);
        supervisorRepository.save(supervisor);
        return supervisor;
    }

    public int deleteSupervisorById(String supervId) {
        supervisorRepository.deleteById(supervId);
        return 1;
    }
}
