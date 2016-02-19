package im.actor.core.api;
/*
 *  Generated by the Actor API Scheme generator.  DO NOT EDIT!
 */

import im.actor.runtime.bser.*;
import im.actor.runtime.collections.*;
import static im.actor.runtime.bser.Utils.*;
import im.actor.core.network.parser.*;
import org.jetbrains.annotations.Nullable;
import org.jetbrains.annotations.NotNull;
import com.google.j2objc.annotations.ObjectiveCName;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

public class ApiMemberAdded extends ApiWebRTCSignaling {

    private ApiCallMember memberAdded;

    public ApiMemberAdded(@NotNull ApiCallMember memberAdded) {
        this.memberAdded = memberAdded;
    }

    public ApiMemberAdded() {

    }

    public int getHeader() {
        return 17;
    }

    @NotNull
    public ApiCallMember getMemberAdded() {
        return this.memberAdded;
    }

    @Override
    public void parse(BserValues values) throws IOException {
        this.memberAdded = values.getObj(2, new ApiCallMember());
    }

    @Override
    public void serialize(BserWriter writer) throws IOException {
        if (this.memberAdded == null) {
            throw new IOException();
        }
        writer.writeObject(2, this.memberAdded);
    }

    @Override
    public String toString() {
        String res = "struct MemberAdded{";
        res += "memberAdded=" + this.memberAdded;
        res += "}";
        return res;
    }

}