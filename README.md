# evil-ldap
A dead-simple node JNDI-exploit server I wrote to understand how the log4j vulnerability works.

This is just intended for **educational purposes**; if you want a tool for pen-testing you will be better served by something like pimp's fork of welks [JNDI-exploit-kit](https://github.com/pimps/JNDI-Exploit-Kit).

Here's the sources I read about when trying to figure out how the JNDI-log4j-LDAP exploit worked:
 - [Lunasec's awesome write-ups](https://www.lunasec.io/docs/blog/log4shell-live-patch-technical)
 - [rayhan0x01's and christophetd's vulnerable spring app](https://github.com/christophetd/log4shell-vulnerable-app)
 - [this blog post](https://mbechler.github.io/2021/12/10/PSA_Log4Shell_JNDI_Injection/)
 - [ldapjs library](http://ldapjs.org/)
