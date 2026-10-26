package com.gymflow.member;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberRepository repository;

    public MemberController(MemberRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Member> list(@RequestParam(required = false) String search) {
        if (search == null || search.isBlank()) return repository.findAll();
        return repository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search);
    }

    @GetMapping("/{id}")
    public Member get(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hội viên id=" + id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Member create(@Valid @RequestBody Member member) {
        if (repository.existsByEmailIgnoreCase(member.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }
        member.setStatus("ACTIVE");
        return repository.save(member);
    }

    @PutMapping("/{id}")
    public Member update(@PathVariable Long id, @Valid @RequestBody Member input) {
        Member member = get(id);
        if (!member.getEmail().equalsIgnoreCase(input.getEmail())
                && repository.existsByEmailIgnoreCase(input.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }
        member.setFullName(input.getFullName());
        member.setEmail(input.getEmail());
        member.setPhone(input.getPhone());
        return repository.save(member);
    }

    @PatchMapping("/{id}/status")
    public Member updateStatus(@PathVariable Long id, @RequestParam String status) {
        if (!List.of("ACTIVE", "INACTIVE").contains(status.toUpperCase())) {
            throw new IllegalArgumentException("Status chỉ nhận ACTIVE hoặc INACTIVE");
        }
        Member member = get(id);
        member.setStatus(status.toUpperCase());
        return repository.save(member);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repository.delete(get(id));
    }
}
